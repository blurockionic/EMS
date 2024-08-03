
import express from "express";
import { createToDoList } from "../controller/todoController.js";

const router =  express.Router();

router.post("/createToDo", createToDoList);

export default router