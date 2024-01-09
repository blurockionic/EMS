import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"


//all routes
import userRoutes  from "./routes/UserRoutes.js"
import employeeRoutes  from "./routes/EmployeeRoutes.js"
import projectRoutes from "./routes/ProjectRoutes.js"
import taskRoutes from "./routes/TaskRoutes.js"
import reportProjectRoutes from "./routes/ReportProjectRoutes.js"
import reportTaskRoutes  from "./routes/ReportTaskRoutes.js"

import  applyLeavesRoutes  from "./routes/LeaveDetailsRoutes.js";

import taskReportFeedbackRoutes from "./routes/TaskReportFeedback.js"

export const app = express()

//configure the dotenv file
dotenv.config({
    path:"./configuration/.env"
})

//middleware
app.use(express.json());
app.use(cookieParser())

// middleware for recieve request from other device 
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","PUT","POST","DELETE"],
    credentials: true
}))
// app.use(cors())

// // Routes for user
app.use('/api/v1/users', userRoutes);

//routes for employee
app.use('/api/v1/employee', employeeRoutes)

// route for project 
app.use("/api/v1/project", projectRoutes)

//route for task
app.use("/api/v1/task", taskRoutes)

//route for report project
app.use("/api/v1/reportProject", reportProjectRoutes)

//route for report task
app.use("/api/v1/taskreport", reportTaskRoutes)


// route for leave apply 

app.use("/api/v1/leave",applyLeavesRoutes )



//route for task report feedback
app.use("/api/v1/taskReportFeedback", taskReportFeedbackRoutes)

//default route
app.get("/", (req, res)=>{
    res.send("nice working")
})
