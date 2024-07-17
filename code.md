 <div>
            <label className="block    font-semibold ">
              Phases (comma-separated):
            </label>
            <input
              type="text"
              value={phases.join(", ")}
              onChange={handleArrayInput(setPhases)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>

          <div>
            <label className="block    font-semibold ">
              Tools and Technologies (comma-separated):
            </label>
            <input
              type="text"
              value={toolsAndTechnologies.join(", ")}
              onChange={handleArrayInput(setToolsAndTechnologies)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>

          <div>
            <label className="block    font-semibold ">
              Required Resources (comma-separated):
            </label>
            <input
              type="text"
              value={requiredResources.join(", ")}
              onChange={handleArrayInput(setRequiredResources)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>



  {/* <div className="mt-4">
              <label className="block font-semibold ">Add payment terms</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Add billing timing</label>
              <input
                type="text"
                value={billingFrequency}
                onChange={(e) => setBillingFrequency(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div> */}






    <div>
      <div>
        <h2>Milestones List</h2>
        {milestones.length === 0 ? (
          <p>No milestones found.</p>
        ) : (
          <ul>
            {milestones.map((milestone) => (
              <li key={milestone._id}>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
                <p>
                  Due Date: {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className=" w-[80%] mx-auto mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row bg-slate-800 text-white font-bold py-1.5 px-4 rounded space-x-2">
            <span className="text-2xl">
              <LuMilestone />
            </span>
            <span className="">Milestones</span>
          </div>

          <div>
            <Link
              to={`../newMilestone/${projectId}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded"
            >
              New milestone
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 dark:bg-slate-600">
            <h3 className="text-lg font-bold mb-2">{/* {title} */}</h3>
            <p className="text-gray-700 mb-2">{/* {description} */}</p>
            <p>
              <strong>Due Date:</strong>
              {/* {dueDate} */}
            </p>
            <p>
              <strong>Project:</strong>
              {/* {projectReference} */}
            </p>
          </div>
        </div>
      </div>
    </div>
















    //new employee
export const newEmployee = async (req, res) => {
  // Fetch all the details from the request body
  const {
    firstName,
    lastName,
  gender,
    email,
    password,
    department,
    role,
    position,
    currentAddress,
    permanentAddress,
    bio,
    nationality,
    dateOfBirth,
    phoneNumber,
    onboardingDate,
    profilePicture 
  } = req.body;

  try {
    // Validation
    if (
      !employeeName ||
      !employeeEmail ||
      !employeePhoneNumber ||
      !password ||
      !designation ||
      !designationType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const isEmailExist = await User.findOne({ email: employeeEmail });
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }


    //convert the designation type into lowercase character
    const lowercaseDesignationType = designationType.toLowerCase();


    
      // Create an entry in the employee collection
      const employee = await Employee.create({
        employeeName,
        employeeEmail,
        password: hashPassword,
        gender,
        employeePhoneNumber,
        dateOfBirth,
        address,
        postOffice,
        policeStation,
        city,
        state,
        pinNumber,
        designation,
        designationType: lowercaseDesignationType,
        department,
      });

      
      // Create a user entry for authentication
      const user = await User.create({
        employeeId: employee._id,
        name: employeeName,
        email: employeeEmail,
        password: hashPassword,
        designation,
        designationType : lowercaseDesignationType,
      });


      return res.status(200).json({
        success: true,
        user,
        employee,
        message: "Account created successfully!",
      });
    
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Please check all the details",
    });
  }
};



















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















// // src/socketHandler.js
// import { Message } from "./model/MessageSchema.js";

// const socketHandler = (io) => {
//   io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     // Join a room named after the user ID to handle private messages
//     socket.on("join", (recipientId) => {
//       socket.join(recipientId);
//       console.log(`User ${socket.id} joined room ${recipientId}`);
//     });

//     // Handle private messages
//     socket.on("privateMessage", async ({ senderId, recipientId, content }) => {
//       try {
//         const message = new Message({
//           sender: senderId,
//           recipient: recipientId,
//           content,
//         });
//         await message.save();

//         // Emit the message to the recipient's room
//         io.to(recipientId).emit("newPrivateMessage", {
//           sender: senderId,
//           recipient: recipientId,
//           content,
//         });

//         // Emit the message to the sender's room (for immediate feedback)
//         io.to(senderId).emit("newPrivateMessage", {
//           sender: senderId,
//           recipient: recipientId,
//           content,
//         });
//       } catch (err) {
//         console.error(
//           "Error saving message inside the sockethandler file:",
//           err
//         );
//         socket.emit("error", "Failed to send message");
//       }
//     });

//     // Handle user disconnect
//     socket.on("disconnect", () => {
//       console.log("User disconnected", socket.id);
//     });
//   });
// };

// export default socketHandler;

// src/socketHandler.js
// src/socketHandler.js
const socketHandler = (io) => {
  const userSocketMap = {}; // socket_Id -> user_Id

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUser", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    });

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${socket.id} joined room ${userId}`);
    });

    socket.on("privateMessage", ({ senderId, recipientId, content }) => {
      const message = {
        senderId,
        recipientId,
        content,
      };

      io.to(recipientId).emit("newPrivateMessage", message);
      io.to(senderId).emit("newPrivateMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

export default socketHandler;
















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










// const socketHandler = (io) => {
//   const userSocketMap = {}; // Map to store userId -> socket.id

//   io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     // Handle user connection
//     const userId = socket.handshake.query.userId;
//     if (userId) {
//       userSocketMap[userId] = socket.id;
//       // Emit updated online users list to all clients
//       io.emit("getOnlineUser", Object.keys(userSocketMap));
//     }

//     // Handle user disconnect
//     socket.on("disconnect", () => {
//       console.log("User disconnected", socket.id);
//       if (userId && userSocketMap[userId] === socket.id) {
//         delete userSocketMap[userId];
//         io.emit("getOnlineUser", Object.keys(userSocketMap));
//       }
//     });

//     // Handle private messages
//     socket.on("privateMessage", ({ senderId, recipientId, content }) => {
//       const message = {
//         senderId,
//         recipientId,
//         content,
//       };

//       // Emit message to recipient's room
//       if (userSocketMap[recipientId]) {
//         io.to(userSocketMap[recipientId]).emit("newPrivateMessage", message);
//       }

//       // Emit message to sender's room for immediate feedback
//       if (userSocketMap[senderId]) {
//         io.to(userSocketMap[senderId]).emit("newPrivateMessage", message);
//       }
//     });
//   });
// };

// export default socketHandler;









// src/components/utilities-components/Chat.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  selectMessages,
  addMessage,
} from "../../Redux/slices/chatSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import useSocket from "../../hooks/useSocket";

const Chat = ({ activeTeamTab }) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const [newMessage, setNewMessage] = useState("");
  const profile = useSelector((state) => state.profile.data);
  const userId = profile._id;
  const { data: users } = useSelector((state) => state.user);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  const socket = useSocket(userId, activeTeamTab === "Activity");

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedRecipientId) {
      dispatch(fetchMessages({ userId, recipientId: selectedRecipientId }));
    }
  }, [dispatch, userId, selectedRecipientId]);

  useEffect(() => {
    if (socket) {
      socket.on("newPrivateMessage", (message) => {
        console.log("real time message me kya aa rha ",message);
        dispatch(addMessage(message));
      });
    }

    return () => {
      if (socket) {
        socket.off("newPrivateMessage");
      }
    };
  }, [socket, dispatch]);

  const handleUserClick = (recipientId) => {
    setSelectedRecipientId(recipientId);
    dispatch(fetchMessages({ userId, recipientId }));
  };

  const sendMessageHandler = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: userId,
      recipientId: selectedRecipientId,
      content: newMessage,
    };

    // Optimistically add the message to the local state
    const localMessage = {
      ...message,
      sender: {
        _id: userId,
        profilePicture: profile.profilePicture,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
      recipient: { _id: selectedRecipientId },
    };

    dispatch(addMessage(localMessage));

    // Clear the input field
    setNewMessage("");

    // Send the message to the server
    dispatch(sendMessage(message));

    if (socket) {
      socket.emit("sendMessage", message);
    }
  };

  const getUserMessages = (recipientId) => {
    return messages.filter(
      (message) =>
        (message.sender._id === userId &&
          message.recipient._id === recipientId) ||
        (message.sender._id === recipientId && message.recipient._id === userId)
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <h2 className="text-lg font-bold mb-2">All Users</h2>
        <ul>
          {users?.map((user) => (
            <li
              key={user._id}
              className={`cursor-pointer p-2 ${
                selectedRecipientId === user._id ? "bg-gray-200" : ""
              }`}
              onClick={() => handleUserClick(user._id)}
            >
              <span>{user.firstName} </span>
              <span>{user.lastName}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        <div className="messages h-5/6 overflow-y-auto">
          {selectedRecipientId ? (
            getUserMessages(selectedRecipientId).length === 0 ? (
              <div className="text-center">No messages yet.</div>
            ) : (
              getUserMessages(selectedRecipientId).map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.sender._id === userId
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div className="flex flex-col items-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        message.sender._id === userId
                          ? message.sender.profilePicture
                          : message.recipient.profilePicture
                      }
                      alt="User"
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {message.sender.firstName} {message.sender.lastName}
                    </span>
                  </div>
                  <div
                    className={`bg-gray-200 p-2 rounded-lg max-w-xs break-words ${
                      message.sender._id === userId
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="text-center">
              Select a user to start a conversation.
            </div>
          )}
        </div>
        {selectedRecipientId && (
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 border rounded p-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={sendMessageHandler}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
