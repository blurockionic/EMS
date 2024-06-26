import { Milestone } from "../model/milestoneSchema.js";

// Create a new milestone
export const createMilestone = async (req, res) => {
  try {
    const { title, description, projectId, dueDate } = req.body;
    const newMilestone = new Milestone({
      title,
      description,
      projectId,
      dueDate,
    });
    const savedMilestone = await newMilestone.save();
    res.status(201).json({
      success: true,
      message: "Milestone created successfully",
      savedMilestone,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating milestone", error });
  }
};

// Update an existing milestone
export const updateMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    const updatedMilestone = await Milestone.findByIdAndUpdate(
      id,
      { title, description, dueDate },
      { new: true }
    );
    if (!updatedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.json(updatedMilestone);
  } catch (error) {
    res.status(500).json({ message: "Error updating milestone", error });
  }
};

// Delete a milestone
export const deleteMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMilestone = await Milestone.findByIdAndDelete(id);
    if (!deletedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    res.json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting milestone", error });
  }
};

// Get all milestones
export const getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find();
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: "Error fetching milestones", error });
  }
};

// Get milestones by project ID
export const getMilestonesByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const milestones = await Milestone.find({ projectId });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: "Error fetching milestones", error });
  }
};
