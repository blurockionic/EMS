// src/slices/meetingSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Async thunk for creating a meeting
export const createMeeting = createAsyncThunk(
  "meetings/createMeeting",
  async (meeting) => {
    const response = await axios.post(
      `${server}/meeting/createNewMeeting`,
      meeting,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data; // Return the response data from the server
  }
);

// Async thunk for updating a meeting
export const updateMeeting = createAsyncThunk(
  "meetings/updateMeeting",
  async ({ id, newData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${server}/meeting/updateMeetingDetails/${id}`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data; // Return the response data from the server
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Return the response data for error handling
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching all meetings
export const fetchMeetings = createAsyncThunk(
  "meetings/fetchMeetings",
  async () => {
    const response = await axios.get(`${server}/meeting/fetchAllMeetings`, {
      withCredentials: true,
    });
    return response.data; // Return the response data from the server
  }
);

// Async thunk to close a meeting
export const closeMeeting = createAsyncThunk(
  'meetings/closeMeeting',
  async ({ meetingId, notes, actualAttendees }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${server}/meeting/closeMeeting/${meetingId}`,
        { notes, actualAttendees },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data; // Return the response data from the server
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the response data for error handling
    }
  }
);

// Create a slice for meetings
const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    data: [], // Array to hold meetings data
    status: "idle", // Status of the request (idle, loading, succeeded, failed)
    newMeetingRes: null, // Response data for creating a meeting
    updateMeetingRes: null, // Response data for updating a meeting
    closeMeetingRes: null, // Response data for closing a meeting
    error: null, // Error message
    successMessage: null, // Success message from backend
  },
  reducers: {}, // No reducers in this slice
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching meetings
      .addCase(fetchMeetings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Handle fulfilled state for fetching meetings
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data; // Set the meetings data
      })
      // Handle rejected state for fetching meetings
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle pending state for creating a meeting
      .addCase(createMeeting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Handle fulfilled state for creating a meeting
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newMeetingRes = action.payload; // Set the response data for creating a meeting
        state.successMessage = action.payload.message; // Assuming backend sends a success message
      })
      // Handle rejected state for creating a meeting
      .addCase(createMeeting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Handle pending state for updating a meeting
      .addCase(updateMeeting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Handle fulfilled state for updating a meeting
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updateMeetingRes = action.payload; // Set the response data for updating a meeting
        state.successMessage = action.payload.message; // Assuming backend sends a success message
      })
      // Handle rejected state for updating a meeting
      .addCase(updateMeeting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Handle pending state for closing a meeting
      .addCase(closeMeeting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Handle fulfilled state for closing a meeting
      .addCase(closeMeeting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.closeMeetingRes = action.payload; // Set the response data for closing a meeting
        state.successMessage = action.payload.message; // Assuming backend sends a success message
      })
      // Handle rejected state for closing a meeting
      .addCase(closeMeeting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default meetingSlice.reducer; // Export the reducer
