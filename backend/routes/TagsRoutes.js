import express from "express";

import { createTags, getAllTags } from "../controller/tagsController.js";

const router = express.Router();

router.post("/newTag", createTags);
router.get("/alltags", getAllTags);

export default router;
