import express from "express";
import {
  GetAllNotifications,
  MarkNotificationAsRead,
} from "../controller/NotificationsController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Get all notifications for a logged-in user
router.get("/getallNotifications", isAuthenticated, GetAllNotifications);

// Mark a notification as read
router.put("/:id/read", MarkNotificationAsRead);

export default router;
