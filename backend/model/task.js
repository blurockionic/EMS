import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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
      type: String
    },

    // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    status: {
      type: String,
      enum: ["Open", "In Review", "Close"],
      default: "Open",
    },
    assignBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const Task = mongoose.model("Task", taskSchema);
