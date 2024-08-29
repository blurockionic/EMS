import express from "express";
import {
  createComment,
  getAllComments,
} from "../controller/commentController.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/new", upload.single("file"), createComment);
router.get("/allcomments", getAllComments);

export default router;
