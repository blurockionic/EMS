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
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data; // Assuming the response contains success and message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for closing a task
export const closeTask = createAsyncThunk(
  "tasks/closeTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/task/close/${taskId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data; // Assuming the response contains success and message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for reopening a task
export const reopenTask = createAsyncThunk(
  "tasks/reopenTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/task/reopen/${taskId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data; // Assuming the response contains success and message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for fetching specific project tasks
export const specificProjectTask = createAsyncThunk(
  "tasks/specificProjectTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${server}/task/specific/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data; // Assuming the response contains specific project task data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
// Thunk for fetching specific project tasks
export const specificEmployeeTasks = createAsyncThunk(
  "tasks/specificEmployeeTasks",
  async (employeeId, thunkAPI) => {
    try {
      console.log("employeeId",employeeId);
      
      const response = await axios.get(
        `${server}/task/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data.allTaskOfEmployee; // Assuming the response contains specific project task data
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
    projectSpecificTasks: [], // Add a new property for project-specific tasks
    employeeSpecificTasks: [], // Add a new property for employee-specific tasks
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
        state.tasks.push(action.payload); // Assuming the new task is added to the state
      })
      .addCase(submitNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(closeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.meta.arg ? { ...task, status: "closed" } : task
        );
      })
      .addCase(closeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(reopenTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reopenTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.meta.arg ? { ...task, status: "open" } : task
        );
      })
      .addCase(reopenTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(specificProjectTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(specificProjectTask.fulfilled, (state, action) => {
        state.loading = false;
        state.projectSpecificTasks = action.payload; // Update the state with specific project tasks
      })
      .addCase(specificProjectTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(specificEmployeeTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(specificEmployeeTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeSpecificTasks = action.payload;
      })
      .addCase(specificEmployeeTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
