// socketHandler.js

const userSocketMap = {}; // Map to store userId -> socketId
let ioInstance = null;
const socketHandler = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      if (userSocketMap[userId]) {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
};

// Function to get receiver's socket ID
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { socketHandler, getReceiverSocketId, ioInstance }; // Export both socketHandler and getReceiverSocketId
