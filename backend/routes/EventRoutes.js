import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getEventsForUser,
  updateEvent,
} from "../controller/eventController.js";

const router = express.Router();

router.get("/getAllEvent", getEvents);
router.get("/getById/:id", getEventById);
router.post("/createEvent", createEvent);
router.put("/updateEvent/:id", updateEvent);
router.delete("/deleteEvent/:id", deleteEvent);

router.get('/usersEvent/:userId', getEventsForUser);

export default router;
