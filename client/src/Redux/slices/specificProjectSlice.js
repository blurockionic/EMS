import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../App';



// Async thunk to fetch a specific project by ID
export const fetchProjectById = createAsyncThunk(
  'project/fetchProjectById',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/project/specific/${projectId}`, {
        withCredentials: true
      });
      return response.data.specificProject;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const specificProjectSlice = createSlice({
    name: 'specificProject',
    initialState: {
        specificProject: null,
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProjectById.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchProjectById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.specificProject = action.payload;
        })
        .addCase(fetchProjectById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    }
  });
  
  export default specificProjectSlice.reducer;
  