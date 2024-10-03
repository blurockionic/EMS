import mongoose from "mongoose";

const actionItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    fileUpload: {
      type: String,
    },

    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    status: {
      type: String,
      enum: ["Open", "In Review", "Close" , "On Hold"],
      default: "Open",
    },
    assignBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    actionItemId: { type: String },

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const ActionItem = mongoose.model("actionItem", actionItemSchema);
