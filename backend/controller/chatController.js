// src/controllers/chatController.js
import { getReceiverSocketId, ioInstance } from "../socketHandler.js";
import { Message } from "../model/MessageSchema.js";
import { User } from "../model/user.js";

// Save message to MongoDB

export const sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;
  // console.log("Sending message form frontend", senderId, recipientId, content);

  try {
    // Save the message to the database
    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });
    const savedMessage = await message.save();

    // Emit the message to the recipient via Socket.IO
    const receiverSocketId = getReceiverSocketId(recipientId); // Use the imported function
    if (receiverSocketId) {
   
      ioInstance.to(receiverSocketId).emit("newPrivateMessage", savedMessage);
    }

    // Respond with the saved message
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
};

// Get messages by user IDs
export const getMessages = async (req, res) => {
  const { userId, recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId },
      ],
    })
      .sort({ timestamp: "asc" })
      .populate({
        path: "sender",
        select: "profilePicture firstName lastName",
        model: User,
      })
      .populate({
        path: "recipient",
        select: "profilePicture firstName lastName",
        model: User,
      })
      .exec();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Get all chat groups
export const getChatGroups = async (req, res) => {
  // Implement logic to fetch chat groups
  res.status(501).json({ error: "Not implemented" });
};

// Create a new chat group
export const createGroup = async (req, res) => {
  // Implement logic to create a new chat group
  res.status(501).json({ error: "Not implemented" });
};
