import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//all routes
import userRoutes from "./routes/UserRoutes.js";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import projectRoutes from "./routes/ProjectRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import tagRouters from "./routes/TagsRoutes.js";
import toDoRoutes from "./routes/toDoRoutes.js";

import actionItemRoutes from "./routes/ActionItemRoutes.js"

import commentRoutes from "./routes/CommentRoutes.js";

import reportProjectRoutes from "./routes/ReportProjectRoutes.js";
import reportTaskRoutes from "./routes/ReportTaskRoutes.js";

import applyLeavesRoutes from "./routes/LeaveDetailsRoutes.js";

import taskReportFeedbackRoutes from "./routes/TaskReportFeedback.js";

import trainingRoutes from "./routes/TrainingRoutes.js";

import teamRoute from "./routes/TeamRoutes.js";

import issueRoutes from "./routes/IssueRoutes.js";

import eventRoutes from "./routes/EventRoutes.js";

import milestoneRoutes from "./routes/milestoneRoutes.js";

import chatRoutes from "./routes/chatRoutes.js";

import meetingRoutes from "./routes/MeetingRoutes.js";

import NotificationsRoutes from "./routes/notificationsRoutes.js";

//configure the dotenv file
dotenv.config({
  path: "./configuration/.env",
});

// middleware for recieve request from other device
// Allow requests from http://localhost:3000

// Allow requests only from http://192.168.1.8:3000
const corsOptions = {
  //for vercel 
  // origin: "https://ems-pi-opal.vercel.app",
  // for development only
  // origin: "http://localhost:3000",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

export const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors(corsOptions));

// Routes for user
app.use("/api/v1/users", userRoutes);

//routes for employee
app.use("/api/v1/employee", employeeRoutes);

// route for project
app.use("/api/v1/project", projectRoutes);

// route for milestone
app.use("/api/v1/milestone", milestoneRoutes);

//route for task
app.use("/api/v1/task", taskRoutes);

// route for all tags
app.use("/api/v1/tag", tagRouters);

// route for issue
app.use("/api/v1/issue", issueRoutes);

// route for comments
app.use("/api/v1/comment", commentRoutes);

//route for report project
app.use("/api/v1/reportProject", reportProjectRoutes);

//route for report task
app.use("/api/v1/taskreport", reportTaskRoutes);

app.use("/api/v1/event", eventRoutes);

app.use("/api/v1/leave", applyLeavesRoutes);

//route for task report feedback
app.use("/api/v1/taskReportFeedback", taskReportFeedbackRoutes);

app.use("/api/v1/training", trainingRoutes);

app.use("/api/v1/team", teamRoute);

// Use chat routes
app.use("/api/v1/chat", chatRoutes);

// use todo router
app.use("/api/v1/todo", toDoRoutes);

// use meeting router
app.use("/api/v1/meeting", meetingRoutes);

// use notification router
app.use("/api/v1/notifications", NotificationsRoutes);

app.use("/api/v1/actionItem", actionItemRoutes)

//default route
app.get("/", (req, res) => {
  res.send("nice working");
});
