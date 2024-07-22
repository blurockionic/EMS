const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("sendMessage", (message) => {
      // Emit the message back to the sender and to all other clients
      io.emit("receiveMessage", message); // Use io.emit to send to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

export { socketHandler };
