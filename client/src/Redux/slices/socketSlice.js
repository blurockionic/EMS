// src/store/socketSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onlineUsers: [],
  messages: [],
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    socketConnect(state, action) {
      state.socket = action.payload;
    },
    socketDisconnect(state) {
      state.socket = null;
    },
  },
});

export const { setOnlineUsers, addMessage, socketConnect, socketDisconnect } = socketSlice.actions;
export default socketSlice.reducer;
