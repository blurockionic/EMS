import { Event } from "../model/eventSchema.js";
import mongoose from "mongoose";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("people");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No event with that id" });
  }
  try {
    const event = await Event.findById(id).populate("people");
    if (!event) {
      return res.status(404).json({ message: "No event with that id" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const { eventTitle, eventDate, startTime, endTime, people } = req.body;
  const newEvent = new Event({
    eventTitle,
    eventDate,
    startTime,
    endTime,
    people,
  });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { eventTitle, eventDate, startTime, endTime, people } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No event with that id" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { eventTitle, eventDate, startTime, endTime, people },
      { new: true, runValidators: true }
    ).populate("people");

    if (!updatedEvent) {
      return res.status(404).json({ message: "No event with that id" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No event with that id" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "No event with that id" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get events for a specific user
export const getEventsForUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: "Invalid user ID" });
  }

  try {
    const events = await Event.find({ people: userId }).populate("people");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
