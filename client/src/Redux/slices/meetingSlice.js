import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // redux function for creating slice and API call using createAsyncThunk function of redux
import axios from "axios"; // axios for API call
import { server } from "../../App"; // importing server URL from app.js file

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
      console.log("New Data:", newData);

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
        // Reject with the response data to be handled in the component
        return rejectWithValue(error.response.data);
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

// Create a slice for meetings
const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    data: [], // Array to hold meetings data
    status: "idle", // Status of the request (idle, loading, succeeded, failed)
    newMeetingRes: null, // Response data for creating a meeting
    updateMeetingRes: null, // Response data for updating a meeting
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
      });
  },
});

export default meetingSlice.reducer; // Export the reducer
