import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
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
    agenda: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Open", "In Review", "Close"],
      default: "Open",
    },
    actualAttendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Updated field
    notes: [{ 
      content: { type: String, trim: true }, 
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
      createdAt: { type: Date, default: Date.now } 
    }], // Added field for notes
    type: { type: String },
  
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
