import express from "express"
import { allTask, closeTask, deleteTask, reopenTask, specificProjectTask, task, taskOfEmployee, updateTask } from "../controller/Task.js"
import { isAuthenticated } from "../middleware/auth.js"

const router =  express.Router()


//routes for new task
router.post("/new",isAuthenticated, task)


//router for get all task 
router.get("/all",isAuthenticated, allTask)

//route for get task of employee
router.get("/:id",isAuthenticated, taskOfEmployee)

//router for update
router.put("/:id",isAuthenticated, updateTask)

//route for close and reopen task 

router.put("/close/:id",isAuthenticated, closeTask)

router.put("/reopen/:id",isAuthenticated, reopenTask)

//route for update task status

//route for delete task 
router.delete("/:id",isAuthenticated, deleteTask)

//route for specific task according to project
router.get("/specific/:id",isAuthenticated, specificProjectTask)


export default router