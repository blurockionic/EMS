import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Thunk for fetching all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/task/all`, {
        withCredentials: true,
      });
      return response.data.allTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for submitting a new task
export const submitNewTask = createAsyncThunk(
  "tasks/submitNewTask",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/task/new`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data; // Assuming the response contains success and message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Create the tasks slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitNewTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitNewTask.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success logic if needed
        console.log("Task created successfully:", action.payload);
      })
      .addCase(submitNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Failed to create task:", action.payload);
      });
  },
});

export default taskSlice.reducer;
