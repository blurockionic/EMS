import express from "express";

import {
  createMilestone,
  deleteMilestone,
  getAllMilestones,
  getMilestonesByProjectId,
  updateMilestone,
  updateMilestoneStatus,
} from "../controller/milestoneController.js";

const router = express.Router();

router.post("/create", createMilestone);
router.put("/update/:id", updateMilestone);
router.delete("/delete/:id", deleteMilestone);
router.get("/allmilestones", getAllMilestones);
router.get("/getprojectmilestones/:projectId", getMilestonesByProjectId);

// PUT request to update milestone status
router.put('/milestones/:id/status', updateMilestoneStatus);

export default router;
