import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // redux funtion for creating slice and api call using createAsyncThunk fuction of redux
import axios from "axios"; // axios for api call 
import { server } from "../../App"; // importing server url from app.js file 

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
  async ({ id, meeting }) => {
    const response = await axios.put(
      `${server}/meeting/updateMeetingDetails/${id}`,
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

// Create a slice for meetings
const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    data: [], // Array to hold meetings data
    status: "idle", // Status of the request (idle, loading, succeeded, failed)
    newMeetingRes: [], // Response data for creating a meeting
    updateMeetingRes: [], // Response data for updating a meeting
  },
  reducers: {}, // No reducers in this slice
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching meetings
      .addCase(fetchMeetings.pending, (state) => {
        state.status = "loading";
      })
      // Handle fulfilled state for fetching meetings
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data; // Set the meetings data
      })
      // Handle rejected state for fetching meetings
      .addCase(fetchMeetings.rejected, (state) => {
        state.status = "failed";
      })
      // Handle pending state for creating a meeting
      .addCase(createMeeting.pending, (state) => {
        state.status = "loading";
      })
      // Handle fulfilled state for creating a meeting
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.newMeetingRes = action.payload; // Set the response data for creating a meeting
      })
      // Handle rejected state for creating a meeting
      .addCase(createMeeting.rejected, (state) => {
        state.status = "failed";
      })
      // Handle pending state for updating a meeting
      .addCase(updateMeeting.pending, (state) => {
        state.status = "loading";
      })
      // Handle fulfilled state for updating a meeting
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.updateMeetingRes = action.payload; // Set the response data for updating a meeting
      })
      // Handle rejected state for updating a meeting
      .addCase(updateMeeting.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default meetingSlice.reducer; // Export the reducer
