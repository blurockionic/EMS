import express from "express"
import { allReport, deleteReport, reportTask, updateReport } from "../controller/ReportTask.js"

const router =  express.Router()

//route for new task report controller
router.post("/:id", reportTask)


//route for get all task
router.get("/:id", allReport)

//route for update specific report 
router.put("/:id", updateReport)

//route for delete report
router.delete("/:id", deleteReport)


export default router 