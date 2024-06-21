// src/routes/issueRoutes.js
import express from 'express';
import { createIssue, deleteIssue, getAllIssues, updateIssue } from '../controller/issueController.js';


const router = express.Router();

router.post('/createissue', createIssue);
router.get('/allissue', getAllIssues);
router.put('/updateissue/:id', updateIssue);
router.delete('/deleteissue/:id', deleteIssue);

export default router;
