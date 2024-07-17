// Import necessary modules
import { Server } from "socket.io";
import { app } from "./app.js";
import { createServer } from "http";
import { connectDB } from "./configuration/database.js";
import { socketHandler } from "./socketHandler.js"; // Ensure this is correctly imported

// Define port with default port 5000
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();
//
// app.listen(PORT, ()=>{
//     console.log(server is wrking on port ${PORT});
// })
// Allow requests only from http://localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};

// Create HTTP server
const server = createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: corsOptions,
});

// Attach Socket.IO to the Express app
app.set("io", io);

// Use the socket handler
socketHandler(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
