// features/event/eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../App';

// Async thunks for API calls
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get(`${server}/event/getAllEvent`);
  return response.data;
});

export const fetchEventById = createAsyncThunk('events/fetchEventById', async (id) => {
  const response = await axios.get(`${server}event/getById/${id}`);
  return response.data;
});

export const fetchEventsForUser = createAsyncThunk('events/fetchEventsForUser', async (userId) => {
  const response = await axios.get(`${server}/event/usersEvent/${userId}`);
  return response.data;
});

export const createEvent = createAsyncThunk('events/createEvent', async (event) => {
  const response = await axios.post(`${server}/event/createEvent`, event);
  return response.data;
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, event }) => {
  const response = await axios.put(`${server}/event/updateEvent/${id}`, event);
  return response.data;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  await axios.delete(`${server}/deleteEvent/${id}`);
  return id;
});

// Slice
const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    event: null,
    userEvents: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(fetchEventsForUser.fulfilled, (state, action) => {
        state.userEvents = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((event) => event._id === action.payload._id);
        state.events[index] = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
