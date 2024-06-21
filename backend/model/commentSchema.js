import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    relatedTaskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    relatedIssueId: { type: mongoose.Schema.Types.ObjectId, ref: "Issue" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
