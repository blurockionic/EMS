// File: src/features/socket/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;

export const initializeSocket = () => (dispatch) => {
  const socket = io("http://localhost:5000", {
    withCredentials: true,
  });
  dispatch(setSocket(socket));

  socket.on("disconnect", () => {
    dispatch(clearSocket());
  });

  return () => {
    socket.close();
  };
};

export default socketSlice.reducer;
