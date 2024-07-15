// // src/slices/chatSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { server } from '../../App';

// const initialState = {
//   socket: null,
//   messages: [],
//   users: [],
//   status: 'idle',
//   error: null,
// };

// // Thunk action to connect to socket
// export const connectToSocket = (userId) => (dispatch) => {
//   const newSocket = io('http://localhost:4000');
//   newSocket.emit('join', userId);

//   newSocket.on('newPrivateMessage', (message) => {
//     dispatch(addMessage(message));
//   });

//   dispatch(setSocket(newSocket));
// };

// // Thunk action to fetch messages
// export const fetchMessages = createAsyncThunk(
//   'chat/fetchMessages',
//   async ({ userId, recipientId }) => {
//     const response = await axios.get(`${server}/chat/messages/${userId}/${recipientId}`);
//     return response.data;
//   }
// );

// // Thunk action to send a message
// export const sendMessage = createAsyncThunk(
//   'chat/sendMessage',
//   async ({ senderId, recipientId, content }) => {
//     const response = await axios.post(`${server}/chat/send`, {
//       senderId,
//       recipientId,
//       content,
//     });
//     return response.data;
//   }
// );

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     addMessage(state, action) {
//       state.messages.push(action.payload);
//     },
//     clearMessages(state) {
//       state.messages = [];
//     },
//     setSocket(state, action) {
//       state.socket = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMessages.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.messages = action.payload;
//       })
//       .addCase(fetchMessages.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.messages.push(action.payload);
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addMessage, clearMessages, setSocket } = chatSlice.actions;

// export const selectSocket = (state) => state.chat.socket;
// export const selectMessages = (state) => state.chat.messages;

// export default chatSlice.reducer;

// src/slices/chatSlice.js
// src/slices/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  messages: [],
  status: "idle",
  error: null,
};

export const connectToSocket = (userId) => (dispatch) => {
  const newSocket = io("http://localhost:4000", {
    query: { userId },
    // reconnection: false,
  });
  newSocket.emit("join", userId);

  newSocket.on("newPrivateMessage", (message) => {
    dispatch(addMessage(message));
  });

  dispatch(setSocket(newSocket));
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
      localStorage.setItem("messages", JSON.stringify(state.messages));
    },
    clearMessages(state) {
      state.messages = [];
      localStorage.removeItem("messages");
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    loadMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, clearMessages, setSocket, loadMessages } =
  chatSlice.actions;

export const selectSocket = (state) => state.chat.socket;
export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
