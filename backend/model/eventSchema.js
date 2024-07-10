// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  people: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }]

}, {
  timestamps: true
});

export const Event = mongoose.model('Event', eventSchema);

