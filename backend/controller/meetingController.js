// Import the Meeting and User models
import { Meeting } from "../model/meetingSchema.js";
import { User } from "../model/user.js";

// Controller function to create a new meeting
export const createMeeting = async (req, res) => {
  try {
    // Extract fields from the request body
    const {
      title,
      createdBy,
      attendees,
      eventTime,
      type,
      agenda,
      lastEditBy,
      lastEditTime,
    } = req.body;

    // Validate required fields
    if (!title || !createdBy || !attendees || !eventTime || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    // Create a new meeting instance
    const newMeeting = new Meeting({
      title,
      createdBy,
      attendees,
      eventTime, // Meeting date and time
      lastEditBy,
      lastEditTime,
      type, // Meeting type (e.g., team meeting, client meeting)
      agenda, // Agenda for the meeting
    });

    // Save the new meeting to the database
    const saveMeeting = await newMeeting.save();

    // Respond with success message and saved meeting data
    res.status(201).json({
      success: true,
      message: "New meeting created successfully",
      data: saveMeeting,
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: error.message });
  }
};

// Controller function to fetch all meetings
export const getMeetings = async (req, res) => {
  try {
    // Fetch all meetings and populate attendee details
    const meetings = await Meeting.find({})
      .populate({
        path: "attendees createdBy lastEditBy", // Populate these fields with user data
        select: "profilePicture firstName lastName", // Select only specific fields from User model
        model: User,
      })
      .sort({ createdAt: -1 }); // Sort meetings by creation date, newest first

    // Check if no meetings are found
    if (meetings.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No meetings found",
      });
    }

    // Respond with success message and meetings data
    res.status(200).json({
      success: true,
      message: "All meeting data fetched successfully",
      data: meetings,
    });
  } catch (error) {
    console.error(error); // Log any errors for debugging
    // Respond with a server error message
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching meetings",
    });
  }
};

// Controller function to update an existing meeting
export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params; // Get meeting ID from request parameters
    const { title, attendees, eventTime, type, lastEditBy, agenda } = req.body; // Extract fields from request body

    // Find and update the meeting by ID
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        title,
        attendees,
        eventTime,
        lastEditBy,
        lastEditTime: new Date(), // Set the current date and time as the last edit time
        type,
        agenda,
      },
      { new: true } // Return the updated meeting document
    );

    // Respond with success message and updated meeting data
    res.status(200).json({
      success: true,
      message: "Meeting details updated successfully ",
      updatedMeeting,
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update meeting status to 'Close'
export const closeMeeting = async (req, res) => {
  try {
    const { id } = req.params; // Get meeting ID from request parameters
    const { notes, actualAttendees } = req.body; // Extract notes and actual attendees from request body

    // Validate input to ensure notes and actualAttendees are arrays
    if (!Array.isArray(notes) || !Array.isArray(actualAttendees)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: notes and actualAttendees should be arrays.",
      });
    }

    // Check if the meeting exists in the database
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    // Check if the meeting is already closed
    if (meeting.status === "Close") {
      return res.status(400).json({
        success: false,
        message: "Meeting is already closed.",
      });
    }

    // Validate actual attendees by checking if user IDs exist
    const users = await User.find({ _id: { $in: actualAttendees } });
    if (users.length !== actualAttendees.length) {
      return res.status(400).json({
        success: false,
        message: "One or more attendee IDs are invalid.",
      });
    }

    // Update the meeting status to 'Close'
    meeting.status = "Close";
    meeting.actualAttendees = actualAttendees; // Update actual attendees
    meeting.notes = [
      ...meeting.notes,
      ...notes.map((note) => ({
        content: note.content,
        createdBy: note.createdBy, // Note creator's ID
        createdAt: new Date(), // Timestamp of note creation
      })),
    ];

    // Save the updated meeting in the database
    await meeting.save();

    // Respond with success message and updated meeting data
    return res.status(200).json({
      success: true,
      message: "Meeting closed successfully.",
      data: meeting,
    });
  } catch (error) {
    console.error("Error closing meeting:", error); // Log the error
    // Respond with a server error message
    return res.status(500).json({
      success: false,
      message: "Server error. Unable to close meeting.",
      error: error.message,
    });
  }
};
