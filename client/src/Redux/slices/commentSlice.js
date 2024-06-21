// commentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // You may need to install axios if not already installed
import { server } from "../../App";

// Define initial state
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

// Fetch comments async thunk
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ relatedTaskId, relatedIssueId }) => {
    try {
      let query = "";
      if (relatedTaskId) {
        query = `?relatedTaskId=${relatedTaskId}`;
      } else if (relatedIssueId) {
        query = `?relatedIssueId=${relatedIssueId}`;
      } else {
        throw new Error(
          "Either relatedTaskId or relatedIssueId must be provided"
        );
      }

      const response = await axios.get(`${server}/comment/allcomments${query}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching comments:", error);
      throw error;
    }
  }
);

// Add comment async thunk
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentData) => {
    const { comment, commentedBy, relatedTaskId } = commentData;
    // console.log("alag alag det ", comment, commentedBy, relatedTaskId);
    try {
      // console.log("kuchh to ho rha h ", commentData);
      const response = await axios.post(`${server}/comment/new`,{
        comment, commentedBy, relatedTaskId
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error adding comment:", error);
      throw error;
    }
  }
);

// Create slice
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch comments reducers
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error fetching comments";
    });

    // Add comment reducers
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.comments.push(action.payload); // Assuming the API returns the added comment
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error adding comment";
    });
  },
});

// Export actions and reducer
export const {} = commentSlice.actions; // If you have additional actions to export
export default commentSlice.reducer;

// Selectors
export const selectComments = (state) => state.comments.comments;
export const selectLoading = (state) => state.comments.loading;
export const selectError = (state) => state.comments.error;
