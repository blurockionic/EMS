import express from "express"
import { createGroup, getChatGroups, getMessages, sendMessage } from "../controller/chatController.js";

const router  = express.Router();

// router.post('/createGroup', createGroup);
// router.post('/sendMessage', sendMessage);
// router.get('/messages/:chatGroupId', getMessages);
// router.get('/groups', getChatGroups);


router.post('/send', sendMessage);

// GET /api/v1/chat/messages/:userId/:recipientId
router.get('/messages/:userId/:recipientId', getMessages);

// GET /api/v1/chat/groups
router.get('/groups', getChatGroups);

// POST /api/v1/chat/createGroup
router.post('/createGroup', createGroup);

export default router;