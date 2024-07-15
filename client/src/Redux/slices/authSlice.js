import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

const initialState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
};

// Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetState(state) {
      // Reset state to initial values
      state.user = initialState.user;
      state.loggedIn = initialState.loggedIn;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assuming your API response structure includes `user`
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; // Assuming your API response structure includes `message`
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = initialState.user; // Reset user to initial state upon logout
        state.loggedIn = initialState.loggedIn;
        state.error = initialState.error;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; // Assuming your API response structure includes `message`
      });
  },
});

export const { clearError, resetState } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
