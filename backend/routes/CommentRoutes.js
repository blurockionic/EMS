import express from "express"
import { createComment, getAllComments } from "../controller/commentController.js"


const router = express.Router()

router.post("/new", createComment)
router.get("/allcomments", getAllComments)


export default router