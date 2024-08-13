// Import necessary functions from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Axios for making HTTP requests
import { server } from "../../App"; // Server URL from your configuration

// Define initial state for the comments slice
const initialState = {
  comments: [],  // Array to store fetched comments
  loading: false, // Boolean to indicate loading state
  error: null, // Variable to store any error messages
};

// Async thunk for fetching comments from the server
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ relatedTaskId, relatedIssueId }) => {
    try {
      let query = "";
      // Construct query string based on provided IDs
      if (relatedTaskId) {
        query = `?relatedTaskId=${relatedTaskId}`;
      } else if (relatedIssueId) {
        query = `?relatedIssueId=${relatedIssueId}`;
      } else {
        throw new Error(
          "Either relatedTaskId or relatedIssueId must be provided"
        );
      }

      // Make HTTP GET request to fetch comments
      const response = await axios.get(`${server}/comment/allcomments${query}`);
      return response.data; // Return fetched comments
    } catch (error) {
      // Log and throw error if request fails
      console.error("Error fetching comments:", error);
      throw error;
    }
  }
);

// Async thunk for adding a new comment to the server
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (formData) => {

    

    //  for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    
    try {
      // Make HTTP POST request to add a new comment
      const response = await axios.post(`${server}/comment/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for form data
        },
        withCredentials: true, // Include credentials with request
      });
      return response.data; // Return added comment
    } catch (error) {
      // Log and throw error if request fails
      console.error("Error adding comment:", error);
      throw error;
    }
  }
);

// Create a slice of the Redux store for comments
const commentSlice = createSlice({
  name: "comments", // Slice name
  initialState, // Initial state defined above
  reducers: {}, // No synchronous reducers defined (can be added if needed)
  extraReducers: (builder) => {
    // Handle different states of fetchComments thunk
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true; // Set loading to true when request is pending
      state.error = null; // Clear any previous errors
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false; // Set loading to false when request is fulfilled
      state.error = null; // Clear any previous errors
      state.comments = action.payload; // Store fetched comments in state
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false; // Set loading to false when request fails
      state.error = action.error.message || "Error fetching comments"; // Store error message
    });

    // Handle different states of addComment thunk
    builder.addCase(addComment.pending, (state) => {
      state.loading = true; // Set loading to true when request is pending
      state.error = null; // Clear any previous errors
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false; // Set loading to false when request is fulfilled
      state.error = null; // Clear any previous errors
      state.comments.push(action.payload); // Add new comment to state
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false; // Set loading to false when request fails
      state.error = action.error.message || "Error adding comment"; // Store error message
    });
  },
});

// Export the slice's actions (none in this case)

// Export the reducer function to be used in the store
export default commentSlice.reducer;

// Selectors to access slice state
export const selectComments = (state) => state.comments.comments;
export const selectLoading = (state) => state.comments.loading;
export const selectError = (state) => state.comments.error;
