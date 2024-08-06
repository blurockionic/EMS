
import express from "express";
import { createToDoList, fetchToDoList } from "../controller/todoController.js";

const router =  express.Router();

router.post("/createToDo", createToDoList);

router.get("/fetchToDoList", fetchToDoList);

export default router