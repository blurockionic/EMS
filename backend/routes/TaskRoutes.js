import express from "express"
import { allTask, deleteTask, specificProjectTask, task, taskOfEmployee, updateTask } from "../controller/Task.js"
import { isAuthenticated } from "../middleware/auth.js"
import upload from "../middleware/multer.middleware.js"

const router =  express.Router()

const logRequestDetails = (req, next) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);
    console.log("Authenticated User:", req.user); // Assuming `req.user` is set by `isAuthenticated` middleware
    next();
};
//routes for new task
router.post("/new",isAuthenticated,upload.single('fileUploader'), task)


//router for get all task 
router.get("/all",isAuthenticated, allTask)

//route for get task of employee
router.get("/:id",isAuthenticated, taskOfEmployee)

//router for update
router.put("/:id",isAuthenticated, updateTask)


//route for delete task 
router.delete("/:id",isAuthenticated, deleteTask)

//route for specific task according to project
router.get("/specific/:id",isAuthenticated, specificProjectTask)


export default router