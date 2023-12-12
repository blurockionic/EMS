import express from "express"
import { allReportOfSpecificProject, deleteReport, reportProject, updateProjectReport } from "../controller/ReportProject.js"
import { isAuthenticated } from "../middleware/auth.js"

const router =  express.Router()


//route for new report controller 
router.post("/:id",isAuthenticated, reportProject)

//route for get all report of specific id 
router.get("/:id", allReportOfSpecificProject)

//route for modify
router.put("/:id", updateProjectReport)

// route for delete report of project
router.delete("/:id", deleteReport)


export default router 