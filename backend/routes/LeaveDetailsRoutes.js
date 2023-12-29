import express from "express"
import { applyLeave } from "../controller/LeaveDetails.js"
import { isAuthenticated } from "../middleware/auth.js"



const router = express.Router()

router.post("/newapply",isAuthenticated, applyLeave)

export default router