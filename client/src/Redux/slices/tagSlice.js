import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await axios.get(`${server}/tag/alltags`, {
    withCredentials: true,
  });

  return response.data.allTags;
});

const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default tagSlice.reducer;
