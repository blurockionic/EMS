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

export const app = express()

//configure the dotenv file
dotenv.config({
    path:"./configuration/.env"
})

//using middleware
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials: true
}))

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
app.use("/api/v1/reportTask", reportTaskRoutes)



//default route
app.get("/", (req, res)=>{
    res.send("nice working")
})
