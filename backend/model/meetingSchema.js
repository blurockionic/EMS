import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createTime: { type: Date, default: Date.now },
  eventTime: { type: Date }, // Corrected typo
  lastEditBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastEditTime: { type: Date, default: Date.now },
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Meeting = mongoose.model("Meeting", meetingSchema);
