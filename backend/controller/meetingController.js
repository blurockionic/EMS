import { Meeting } from "../model/meetingSchema.js";
import { User } from "../model/user.js";

export const createMeeting = async (req, res) => {
  try {
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

    if (!title || !createdBy || !attendees || !eventTime || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const newMeeting = new Meeting({
      title,
      createdBy,
      attendees,
      eventTime, // Corrected typo
      lastEditBy,
      lastEditTime,
      type,
      agenda,
    });

    const saveMeeting = await newMeeting.save();
    res.status(201).json({
      success: true,
      message: "New meeting created successfully",
      data: saveMeeting,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({})
      .populate({
        path: "attendees createdBy lastEditBy",
        select: "profilePicture firstName lastName",
        model: User,
      })
      .sort({ createdAt: -1 });

    console.log(meetings); // Log the result to check if sorting is working

    if (meetings.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No meetings found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All meeting data fetched successfully",
      data: meetings,
    });
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching meetings",
    });
  }
};

export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, attendees, eventTime, type, lastEditBy, agenda } = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        title,
        attendees,
        eventTime,
        lastEditBy,
        lastEditTime: new Date(),
        type,
        agenda,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Meeting details updated successfully ",
      updatedMeeting,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update meeting status to 'Close'
export const closeMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, actualAttendees } = req.body;

    // Validate input
    if (!Array.isArray(notes) || !Array.isArray(actualAttendees)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: notes and actualAttendees should be arrays.',
      });
    }

    // Check if meeting exists
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Meeting not found.',
      });
    }

    // Check if the meeting is already closed
    if (meeting.status === 'Close') {
      return res.status(400).json({
        success: false,
        message: 'Meeting is already closed.',
      });
    }

    // Validate actualAttendees
    const users = await User.find({ _id: { $in: actualAttendees } });
    if (users.length !== actualAttendees.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more attendee IDs are invalid.',
      });
    }

    // Update meeting
    meeting.status = 'Close';
    meeting.actualAttendees = actualAttendees;
    meeting.notes = [
      ...meeting.notes,
      ...notes.map(note => ({
        content: note.content,
        createdBy: note.createdBy, // This should be provided with the request
        createdAt: new Date(), // Set the creation time
      })),
    ];

    // Save updated meeting
    await meeting.save();

    return res.status(200).json({
      success: true,
      message: 'Meeting closed successfully.',
      data: meeting,
    });
  } catch (error) {
    console.error('Error closing meeting:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Unable to close meeting.',
      error: error.message,
    });
  }
};
