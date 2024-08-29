import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

// Initial state of the auth slice
const initialState = {
  user: null,  // Stores user details after successful login
  loggedIn: localStorage.getItem('loggedIn') === 'true' || false,  // Retrieves loggedIn state from localStorage
  loading: false,  // Indicates if a login/logout request is in progress
  error: null,  // Stores any error messages from login/logout requests
};

// Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Sends a POST request to the login API with email and password
      const response = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",  // Sets the request header to JSON
          },
          withCredentials: true,  // Ensures credentials like cookies are included
        }
      );
      return response.data;  // Returns the API response data on success
    } catch (error) {
      return rejectWithValue(error.response.data);  // Returns error message on failure
    }
  }
);

// Thunk for logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Sends a GET request to the logout API
      const response = await axios.get(`${server}/users/logout`, {
        withCredentials: true,  // Ensures credentials like cookies are included
      });
      return response.data;  // Returns the API response data on success
    } catch (error) {
      return rejectWithValue(error.response.data);  // Returns error message on failure
    }
  }
);

// Slice for authentication state management
const authSlice = createSlice({
  name: "auth",  // Name of the slice
  initialState,  // Sets the initial state of the slice
  reducers: {
    clearError(state) {
      state.error = null;  // Clears any existing error messages
    },
    resetState(state) {
      state.user = initialState.user;  // Resets user to initial state
      state.loggedIn = initialState.loggedIn;  // Resets loggedIn to initial state
      state.loading = initialState.loading;  // Resets loading to initial state
      state.error = initialState.error;  // Resets error to initial state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;  // Sets loading to true while login request is in progress
        state.error = null;  // Clears any existing error messages
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;  // Sets loading to false as request is complete
        state.user = action.payload.user;  // Updates user with data from API response
        state.loggedIn = true;  // Sets loggedIn to true as login is successful
        localStorage.setItem('loggedIn', 'true');  // Persists loggedIn state in localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;  // Sets loading to false as request is complete
        state.error = action.payload.message;  // Stores the error message from the failed request
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;  // Sets loading to true while logout request is in progress
        state.error = null;  // Clears any existing error messages
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;  // Sets loading to false as request is complete
        state.user = initialState.user;  // Resets user to initial state upon logout
        state.loggedIn = initialState.loggedIn;  // Resets loggedIn to initial state upon logout
        localStorage.removeItem('loggedIn');  // Removes loggedIn state from localStorage
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;  // Sets loading to false as request is complete
        state.error = action.payload.message;  // Stores the error message from the failed request
      });
  },
});

// Exporting actions for clearing errors and resetting state
export const { clearError, resetState } = authSlice.actions;

// Selectors to access specific parts of the auth state
export const selectUser = (state) => state.auth.user;  // Selector for the user state
export const selectLoggedIn = (state) => state.auth.loggedIn;  // Selector for the loggedIn state
export const selectLoading = (state) => state.auth.loading;  // Selector for the loading state
export const selectError = (state) => state.auth.error;  // Selector for the error state

// Exporting the reducer to be used in the store
export default authSlice.reducer;
