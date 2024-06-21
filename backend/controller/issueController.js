
import { Issue } from "../model/issueSchema.js";

export const createIssue = async (req, res) => {
  const {
    title,
    issueId,
    description,
    tags,
    status,
    assignBy,
    assignTo,
    project,
    dueDateTime,
  } = req.body;

  try {
    const newIssue = new Issue({
      title,
      issueId,
      description,
      tags,
      status,
      assignBy,
      assignTo,
      project,
      dueDateTime,
    });

    await newIssue.save();
    res.status(201).json({
      success: true,
      message: "issue create successfuly ",
      newIssue,
    });
  } catch (error) {
    res.status(500).json({ success:false, message: "Error creating issue", error });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json({
      success: true,
      message: "all issue fetched successfully",
      issues,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching issues", error });
  }
};

export const updateIssue = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedIssue = await Issue.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedIssue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "issue update success", updatedIssue });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating issue", error });
  }
};

export const deleteIssue = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting issue", error });
  }
};
