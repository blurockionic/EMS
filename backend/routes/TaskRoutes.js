import express from "express";
import {
  allTask,
  closeTask,
  deleteTask,
  putTaskOnHold,
  reopenTask,
  specificProjectTask,
  submitTaskForReview,
  task,
  taskOfEmployee,
  updateTask,
} from "../controller/Task.js";
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
router.post("/new", isAuthenticated, upload.single("file"), task);

//router for get all task
router.get("/all", isAuthenticated, allTask);

//route for get task of employee
router.get("/:id", isAuthenticated, taskOfEmployee);

//router for update
router.put("/:id", isAuthenticated, updateTask);

//route for close and reopen task

router.put("/close/:id", isAuthenticated, closeTask);

router.put("/reopen/:id", isAuthenticated, reopenTask);

//route for update task status

// Route to put a task on hold
router.put("/hold/:taskId", putTaskOnHold);

// Route to submit a task for review
router.put("/review/:taskId", submitTaskForReview);

//route for delete task
router.delete("/:id", isAuthenticated, deleteTask);

//route for specific task according to project
router.get("/specific/:id", isAuthenticated, specificProjectTask);

export default router;
