import express, { Router } from "express";
import { addTraining } from "../controller/Training.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.post("/newTraining", isAuthenticated, addTraining)

export default router;