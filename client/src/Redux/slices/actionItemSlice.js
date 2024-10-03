import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Thunk for fetching all actionItem
export const fetchActionItems = createAsyncThunk(
  "actionItem/fetchActionItem",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/actionItem/all`, {
        withCredentials: true,
      });
      return response.data.allActionItem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for submitting a new actionItem
export const submitNewActionItem = createAsyncThunk(
  "actionItem/submitNewActionItem",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/actionItem/new`, formData, {
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

// Thunk for closing a actionItem
export const closeActionItem = createAsyncThunk(
  "actionItem/closeActionItem",
  async (actionItemId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/actionItem/close/${actionItemId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for reopening a actionItem
export const reopenActionItem = createAsyncThunk(
  "actionItem/reopenActionItem",
  async (actionItemId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/actionItem/reopen/${actionItemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for putting a actionItem on hold
export const putActionItemOnHold = createAsyncThunk(
  "actionItem/putActionItemOnHold",
  async (actionItemId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/actionItem/hold/${actionItemId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for submitting a actionItem for review
export const submitActionItemForReview = createAsyncThunk(
  "actionItem/submitActionItemForReview",
  async (actionItemId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/actionItem/review/${actionItemId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for fetching specific project actionItem
export const specificProjectActionItem = createAsyncThunk(
  "actionItem/specificProjectActionItem",
  async (ActionItemId, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/actionItem/specific/${ActionItemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for fetching specific employee actionItem
export const specificEmployeeActionItem = createAsyncThunk(
  "actionItem/specificEmployeeActionItem",
  async (employeeId, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/actionItem/${employeeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data.allActionItemOfEmployee;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Create the actionItem slice
const actionItemSlice = createSlice({
  name: "actionItem",
  initialState: {
    actionItem: [],
    projectSpecificActionItem: [], // Add a new property for project-specific actionItem
    employeeSpecificActionItem: [], // Add a new property for employee-specific actionItem
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching actionItem
      .addCase(fetchActionItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActionItems.fulfilled, (state, action) => {
        state.loading = false;
        state.actionItem = action.payload;
      })
      .addCase(fetchActionItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submitting a new actionItem
      .addCase(submitNewActionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitNewActionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.actionItem.push(action.payload);
      })
      .addCase(submitNewActionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Closing a actionItem
      .addCase(closeActionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeActionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.actionItem = state.actionItem.map((actionItem) =>
          actionItem._id === action.meta.arg ? { ...actionItem, status: "closed" } : actionItem
        );
      })
      .addCase(closeActionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reopening a actionItem
      .addCase(reopenActionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reopenActionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.actionItem = state.actionItem.map((actionItem) =>
          actionItem._id === action.meta.arg ? { ...actionItem, status: "open" } : actionItem
        );
      })
      .addCase(reopenActionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Putting a actionItem on hold
      .addCase(putActionItemOnHold.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putActionItemOnHold.fulfilled, (state, action) => {
        state.loading = false;
        state.actionItem = state.actionItem.map((actionItem) =>
          actionItem._id === action.meta.arg ? { ...actionItem, status: "on hold" } : actionItem
        );
      })
      .addCase(putActionItemOnHold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submitting a actionItem for review
      .addCase(submitActionItemForReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitActionItemForReview.fulfilled, (state, action) => {
        state.loading = false;
        state.actionItem = state.actionItem.map((actionItem) =>
          actionItem._id === action.meta.arg ? { ...actionItem, status: "in review" } : actionItem
        );
      })
      .addCase(submitActionItemForReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetching specific project actionItem
      .addCase(specificProjectActionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(specificProjectActionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.projectSpecificActionItem = action.payload;
      })
      .addCase(specificProjectActionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetching specific employee actionItem
      .addCase(specificEmployeeActionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(specificEmployeeActionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeSpecificActionItem = action.payload || [];
      })
      .addCase(specificEmployeeActionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default actionItemSlice.reducer;
