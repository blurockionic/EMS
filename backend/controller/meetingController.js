import { Meeting } from "../model/meetingSchema.js";
import { User } from "../model/user.js";

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({}).populate({
      path: "attendees createdBy lastEditBy",
      select: "profilePicture firstName lastName", // Select fields to populate
      model: User, // Specify the User model for population
    });
    if (!meetings) {
      return res.status(401).json({
        success: true,
        message: "No meetings found",
      });
    }
    res.status(200).json({
      success: true,
      message: "all meeting data fetch successfully",
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMeeting = async (req, res) => {
  try {
    const {
      title,
      createdBy,
      attendees,
      eventTime, // Corrected typo
      type,
      lastEditBy,
      lastEditTime,
    } = req.body;

    console.log("Data from frontend: ", req.body);

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

export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, attendees, eventTime, type, lastEditBy } = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        title,
        attendees,
        eventTime,
        lastEditBy,
        lastEditTime: new Date(),
        type,
      },
      { new: true }
    );
    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
