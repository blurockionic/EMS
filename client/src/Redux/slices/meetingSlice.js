import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Async thunk for creating a meeting
export const createMeeting = createAsyncThunk(
  "meetings/createMeeting",
  async (meeting) => {
    console.log(meeting, "meeting data");

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
    return response.data;
  }
);

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
    return response.data;
  }
);

// Async thunk for fetching all meetings
export const fetchMeetings = createAsyncThunk(
  "meetings/fetchMeetings",
  async () => {
    const response = await axios.get(`${server}/meeting/fetchAllMeetings`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    data: [], // Ensure this is an empty array initially
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchMeetings.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createMeeting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        // state.data = action.payload;
        
      })
      .addCase(createMeeting.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateMeeting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        // const index = state.data.findIndex(
        //   (meeting) => meeting._id === action.payload._id
        // );
        // if (index !== -1) {
        //   state.data[index] = action.payload;
        // }
      })
      .addCase(updateMeeting.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default meetingSlice.reducer;
