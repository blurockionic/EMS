
import express from "express";
import { createToDoList, deleteToDo, fetchToDoList } from "../controller/todoController.js";

const router =  express.Router();

router.post("/createToDo", createToDoList);

router.get("/fetchToDoList", fetchToDoList);

router.delete("/deleteToDo/:id", deleteToDo);

export default router
