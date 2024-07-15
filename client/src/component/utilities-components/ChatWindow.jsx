// File: src/components/ChatWindow.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatWindow = ({ currentGroup }) => {
  const socket = useSelector((state) => state.socket.socket);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentGroup) {
      axios.get(`/api/v1/chat/messages/${currentGroup._id}`).then((response) => {
        setMessages(response.data);
      });
    }
  }, [currentGroup]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        content: newMessage,
        sender: "currentUserId", // Replace with actual user ID
        chatGroup: currentGroup._id,
      };

      socket.emit("sendMessage", { ...message, room: currentGroup._id });
      axios.post("/api/v1/chat/sendMessage", message).then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      });
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <strong>{message.sender.name}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
