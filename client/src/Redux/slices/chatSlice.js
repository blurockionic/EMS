import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App"; // Adjust the import according to your actual server configuration

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

// Thunk action to fetch messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ userId, recipientId }) => {
    try {
      const response = await axios.get(
        `${server}/chat/messages/${userId}/${recipientId}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

// Thunk action to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, recipientId, content }, { dispatch }) => {
    try {
      const response = await axios.post(`${server}/chat/send`, {
        senderId,
        recipientId,
        content,
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
