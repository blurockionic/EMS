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
