// src/controllers/chatController.js

import { Message } from "../model/MessageSchema.js";

// Save message to MongoDB
export const sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;
console.log("front end hit se kya data a rha h ", senderId, recipientId, content);
  try {
    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });
    const savedMessage = await message.save();
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
    const messages = await Message.find({ sender: userId, recipient: recipientId }).sort({ timestamp: "asc" });
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
