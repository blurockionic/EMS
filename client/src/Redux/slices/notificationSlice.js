import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Fetch notifications for the logged-in user
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axios.get(`${server}/notifications/getallNotifications`, {
      withCredentials: true, // Pass cookies for session management
    });
    return response.data.notifications;
  }
);

// Mark a notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId) => {
    const response = await axios.put(
      `${server}/notifications/${notificationId}/read`,
      {},
      { withCredentials: true }
    );
    return response.data.notification;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updatedNotification = action.payload;
        // Update the specific notification to mark it as read
        state.notifications = state.notifications.map((notification) =>
          notification._id === updatedNotification._id
            ? { ...notification, read: true }
            : notification
        );
      });
  },
});

export default notificationSlice.reducer;
