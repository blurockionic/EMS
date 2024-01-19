import express from "express";
import {allTeams, teamDetail} from "../controller/Teams.js"
import { isAuthenticated } from "../middleware/auth.js"



const router = express.Router()



//routes for new Team Creation
router.post("/CreateNewTeam",isAuthenticated, teamDetail)

// router for geting all data of new Team 
router.get("/allTeams",isAuthenticated, allTeams)

export default router
