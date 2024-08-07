import express from "express"
import { createMeeting, getMeetings, updateMeeting } from "../controller/meetingController.js"

const router = express.Router()

router.post("/createNewMeeting", createMeeting)
router.put("/updateMeetingDetails/:id", updateMeeting)
router.get("/fetchAllMeetings", getMeetings)


export default router