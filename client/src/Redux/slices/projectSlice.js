// file path: /path/to/your/projectSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/project/all`, {
        withCredentials: true,
      });
      return response.data.allProject;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for creating a new project
export const createProject = createAsyncThunk(
  "project/createProject",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/project/new`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data; // Assuming the response contains a message and project details
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue("No response from server");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    allProject: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects cases
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProject = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create project cases
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally update the state with the new project data if needed
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
