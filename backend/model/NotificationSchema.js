import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false, // Default status of the notification is unread
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

export const Notification = mongoose.model("Notifications", notificationSchema);
