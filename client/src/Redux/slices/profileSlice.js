import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetState } from "./authSlice"; // Import the resetState action from authSlice
import { server } from "../../App";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await axios.get(`${server}/users/me`, {
      withCredentials: true,
    });
    return response.data.user;
  }
);

const initialState = {
  data: {},
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resetState, (state) => {
        state.data = initialState.data;
        state.status = initialState.status;
        state.error = initialState.error;
      });
  },
});

export default profileSlice.reducer;
