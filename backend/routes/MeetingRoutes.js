import express from "express"
import { closeMeeting, createMeeting, getMeetings, updateMeeting } from "../controller/meetingController.js"

const router = express.Router()

router.post("/createNewMeeting", createMeeting)
router.put("/updateMeetingDetails/:id", updateMeeting)
router.get("/fetchAllMeetings", getMeetings)
router.put('/closeMeeting/:id', closeMeeting);


export default router