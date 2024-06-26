// src/features/milestones/fetchMilestonesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../App";

// Async Thunks for fetching milestones
export const fetchAllMilestones = createAsyncThunk(
  "milestones/fetchAllMilestones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/milestones/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMilestonesByProjectId = createAsyncThunk(
  "milestones/fetchMilestonesByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${server}/milestone/getprojectmilestones/${projectId}`
      );
      // console.log("milestone by project id", response)
      return response.data.milestones;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchMilestonesSlice = createSlice({
  name: "fetchMilestones",
  initialState: {
    milestones: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Milestones
      .addCase(fetchAllMilestones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMilestones.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones = action.payload;
      })
      .addCase(fetchAllMilestones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Milestones by Project ID
      .addCase(fetchMilestonesByProjectId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMilestonesByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("action.payload", action.payload);
        state.milestones = action.payload;
      })
      .addCase(fetchMilestonesByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fetchMilestonesSlice.reducer;
