import express from "express";

import {
  createMilestone,
  deleteMilestone,
  getAllMilestones,
  getMilestonesByProjectId,
  updateMilestone,
} from "../controller/milestoneController.js";

const router = express.Router();

router.post("/create", createMilestone);
router.put("/update/:id", updateMilestone);
router.delete("/delete/:id", deleteMilestone);
router.get("/allmilestones", getAllMilestones);
router.get("/getprojectmilestones/:projectId", getMilestonesByProjectId);

export default router;
