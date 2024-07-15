// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { server } from "../../App";

// // Thunk to initialize the socket connection
// export const initializeSocket = createAsyncThunk(
//   "socket/initializeSocket",
//   async (_, { dispatch }) => {
//     try {
//       const socket = io(`${server}`, {
//         withCredentials: true,
//       });

//       socket.on("disconnect", () => {
//         dispatch(clearSocket());
//       });

//       socket.on("receiveMessage", (message) => {
//         const { chatGroup: groupId, ...msg } = message;
//         dispatch(addMessage({ groupId, message: msg }));
//       });

//       dispatch(setSocket(socket));

//       return () => {
//         socket.close();
//       };
//     } catch (error) {
//       console.error("Error initializing socket:", error);
//     }
//   }
// );

// // Thunk to fetch chat groups
// export const fetchChatGroups = createAsyncThunk(
//   "socket/fetchChatGroups",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${server}/chat/groups`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching chat groups:", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Thunk to fetch messages for a group
// export const fetchMessages = createAsyncThunk(
//   "socket/fetchMessages",
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${server}/chat/messages/${groupId}`);
//       return { groupId, messages: response.data };
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Thunk to send a message
// export const sendMessage = createAsyncThunk(
//   "socket/sendMessage",
//   async (message, { getState, rejectWithValue, dispatch }) => {
//     const { socket } = getState().socket;
//     if (socket) {
//       const { content, sender, chatGroup } = message;
//       socket.emit("sendMessage", { room: chatGroup, content, sender });
//       try {
//         const response = await axios.post(`${server}/chat/sendMessage`, message);
//         dispatch(addMessage({ groupId: chatGroup, message: response.data }));
//       } catch (error) {
//         console.error("Error sending message:", error);
//         return rejectWithValue(error.response.data);
//       }
//     } else {
//       console.error("Socket is not connected.");
//     }
//   }
// );

// // Initial state for the socket slice
// const initialState = {
//   socket: null,
//   groups: [],
//   messages: {},
//   loading: false,
//   error: null,
// };

// const socketSlice = createSlice({
//   name: "socket",
//   initialState,
//   reducers: {
//     setSocket: (state, action) => {
//       state.socket = action.payload;
//     },
//     clearSocket: (state) => {
//       state.socket = null;
//     },
//     addMessage: (state, action) => {
//       const { groupId, message } = action.payload;
//       if (!state.messages[groupId]) {
//         state.messages[groupId] = [];
//       }
//       state.messages[groupId].push(message);
//     },
//     setMessages: (state, action) => {
//       const { groupId, messages } = action.payload;
//       state.messages[groupId] = messages;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchChatGroups.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchChatGroups.fulfilled, (state, action) => {
//         state.loading = false;
//         state.groups = action.payload;
//       })
//       .addCase(fetchChatGroups.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchMessages.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.loading = false;
//         const { groupId, messages } = action.payload;
//         state.messages[groupId] = messages;
//       })
//       .addCase(fetchMessages.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setSocket, clearSocket, addMessage, setMessages } =
//   socketSlice.actions;

// export default socketSlice.reducer;

// src/features/socket/socketSlice.js

// src/features/socket/socketSlice.js



// import { createSlice } from '@reduxjs/toolkit';
// import io from 'socket.io-client';

// const initialState = {
//   socket: null,
//   messages: [],
// };

// const socketSlice = createSlice({
//   name: 'socket',
//   initialState,
//   reducers: {
//     addMessage(state, action) {
//       state.messages.push(action.payload);
//     },
//     clearMessages(state) {
//       state.messages = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase('socket/setSocket', (state, action) => {
//         state.socket = action.payload;
//       });
//   },
// });

// export const { addMessage, clearMessages } = socketSlice.actions;

// // Thunk action to connect to socket
// export const connectToSocket = (userId) => (dispatch) => {
//   const newSocket = io('http://localhost:4000');
//   newSocket.emit('join', userId);

//   dispatch({ type: 'socket/setSocket', payload: newSocket });

//   newSocket.on('newPrivateMessage', (message) => {
//     dispatch(addMessage(message));
//   });

//   return () => {
//     newSocket.close();
//     dispatch({ type: 'socket/setSocket', payload: null });
//     dispatch(clearMessages());
//   };
// };

// // Selector to get the socket from state
// export const selectSocket = (state) => state.socket.socket;

// export const selectMessages = (state) => state.socket.messages;

// export default socketSlice.reducer;
