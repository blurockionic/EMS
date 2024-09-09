import { Notification } from "../model/NotificationSchema.js";

// Get all notifications for a logged-in user
export const GetAllNotifications = async (req, res) => {
  try {
    // Check if req.user and req.user._id exist
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    // Fetch notifications for the logged-in user, sorted by creation date
    const notifications = await Notification.find({}).sort({
      createdAt: -1,
    });

    // Check if there are any notifications
    if (notifications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No notifications found",
        notifications: [],
      });
    }
    // Return success response with the notifications
    return res.status(200).json({
      success: true,
      message: `${notifications.length} notification(s) found`,
      notifications,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching notifications:", error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });
  }
};

// Mark a notification as read
export const MarkNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    return res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("Error updating notification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating notification" });
  }
};
