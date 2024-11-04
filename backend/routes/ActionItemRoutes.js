import express from "express";
import {
  allActionItem,
  closeActionItem,
  deleteActionItem,
  putActionItemOnHold,
  reopenActionItem,
  specificProjectActionItem,
  submitActionItemForReview,
  actionItem,
  actionItemOfEmployee,
  updateActionItemDetails,
  getActionItem
} from "../controller/actionItems.js";
import { isAuthenticated } from "../middleware/auth.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

const logRequestDetails = (req, next) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
  console.log("Authenticated User:", req.user); // Assuming `req.user` is set by `isAuthenticated` middleware
  next();
};
//routes for new task
router.post("/new", isAuthenticated, upload.single("file"), actionItem);

//router for get all task
router.get("/all", isAuthenticated, allActionItem);


router.get('/singleActionItem/:id', getActionItem);


//route for get task of employee
router.get("/:id", isAuthenticated, actionItemOfEmployee);

//router for update
//router.put("/:id", isAuthenticated, updateActionItem);

router.put("/updateDetails/:id", isAuthenticated, updateActionItemDetails);

//route for close and reopen task

router.put("/close/:id", isAuthenticated, closeActionItem);

router.put("/reopen/:id", isAuthenticated, reopenActionItem);

//route for update task status

// Route to put a task on hold
router.put("/hold/:actionItemId", putActionItemOnHold);

// Route to submit a task for review
router.put("/review/:actionItemId", submitActionItemForReview);

//route for delete task
router.delete("/:id", isAuthenticated, deleteActionItem);

//route for specific task according to project
router.get("/specific/:id", isAuthenticated, specificProjectActionItem);

export default router;
