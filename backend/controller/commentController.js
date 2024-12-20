import { Comment } from "../model/commentSchema.js";
import { Issue } from "../model/issueSchema.js";
import { Task } from "../model/task.js";
import { ActionItem } from "../model/actionItem.js";
import { User } from "../model/user.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";

// Create Comment
export const createComment = async (req, res) => {
  const { comment, commentedBy, relatedTaskId, relatedIssueId, relatedActionItemId } = req.body;
  const file = req.file; // Access the uploaded file

  try {
    // Ensure that the user exists
    const user = await User.findById(commentedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure that either task or issue exists
    if (relatedTaskId) {
      const task = await Task.findById(relatedTaskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
    }

    if (relatedIssueId) {
      const issue = await Issue.findById(relatedIssueId);
      if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
      }
    }

    if (relatedActionItemId) {
      const actionItem = await ActionItem.findById(relatedActionItemId);
      if (!actionItem) {
        return res.status(404).json({ message: "actionItem not found" });
      }
    }

    const newComment = new Comment({
      relatedTaskId,
      relatedIssueId,
      relatedActionItemId,
      comment,
      commentedBy,
    });

    if (file) {
      // Upload profile picture to Cloudinary
      const uploadResult = await uploadOnCloudinary(req.file.path);
      console.log("Upload result:", uploadResult);

      if (uploadResult) {
        newComment.documentFile = uploadResult.url;
      }
    } else {
      console.log("No file recieved");
    }

    // Save the comment to the database
    await newComment.save();
    // Update the Task document with the new comment reference
    if (relatedTaskId) {
      await Task.findByIdAndUpdate(relatedTaskId, {
        $push: { comments: newComment._id },
      });
    }else if (relatedActionItemId) {
      await ActionItem.findByIdAndUpdate(relatedActionItemId, {
        $push: { comments: newComment._id },
      });
    } else if (relatedIssueId) {
      // Update the Issue document with the new comment reference if needed
    }

    res.status(201).json({
      success: true,
      message: "comment created successfully",
      newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get All Comments
export const getAllComments = async (req, res) => {
  const { relatedTaskId, relatedIssueId, relatedActionItemId } = req.query;

  try {
    let allComments;
    if (relatedTaskId) {
      allComments = await Comment.find({ relatedTaskId });
    } else if (relatedIssueId) {
      allComments = await Comment.find({ relatedIssueId });
    }else if (relatedActionItemId) {
      allComments = await Comment.find({ relatedActionItemId });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Task ID or Issue ID is required" });
    }

    res.status(200).json({
      success: true,
      message: "All comments fetched successfully",
      allComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
