const socketHandler = (io) => {
  const userSocketMap = {}; // socket_Id -> user_Id

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
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
