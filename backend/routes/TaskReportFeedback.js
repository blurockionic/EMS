import express from "express"
import { isAuthenticated } from "../middleware/auth.js"
import { taskReportFeedback } from "../controller/TaskFeedback.js"

const router = express.Router()

//router for new feedback
router.post("/new", isAuthenticated, taskReportFeedback)


export default router