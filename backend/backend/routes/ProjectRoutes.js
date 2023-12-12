import express from "express"
import { allProject, deleteProject, newProject, updateProject } from "../controller/Project.js"
import { isAuthenticated } from "../middleware/auth.js"

const router =  express.Router()


//route for new project 
router.post("/new",isAuthenticated, newProject)

//route  for get all the project
router.get("/all",isAuthenticated, allProject)

//route for update project
router.put("/:id",isAuthenticated, updateProject)

// route for delete project
router.delete("/:id",isAuthenticated, deleteProject)



export default router