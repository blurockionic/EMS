// src/features/milestones/milestonesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../../App';



// Async Thunks for CRUD operations
export const createMilestone = createAsyncThunk('milestones/createMilestone', async (milestoneData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${server}/milestone/create`, milestoneData);
    console.log("log resposne me kuch aya ", response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateMilestone = createAsyncThunk('milestones/updateMilestone', async ({ id, milestoneData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${server}/${id}`, milestoneData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteMilestone = createAsyncThunk('milestones/deleteMilestone', async (id, { rejectWithValue }) => {
  try {
    // await axios.delete(`${apiUrl}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const milestonesSlice = createSlice({
  name: 'milestones',
  initialState: {
    milestones: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Milestone
      .addCase(createMilestone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones.push(action.payload);
      })
      .addCase(createMilestone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Milestone
      .addCase(updateMilestone.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMilestone.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.milestones.findIndex((milestone) => milestone._id === action.payload._id);
        if (index !== -1) {
          state.milestones[index] = action.payload;
        }
      })
      .addCase(updateMilestone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Milestone
      .addCase(deleteMilestone.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.milestones = state.milestones.filter((milestone) => milestone._id !== action.payload);
      })
      .addCase(deleteMilestone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default milestonesSlice.reducer;
