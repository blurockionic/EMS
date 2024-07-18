import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  selectMessages,
} from "../../Redux/slices/chatSlice";
import io from "socket.io-client";
import { IoSend } from "react-icons/io5";

const Chat = ({ activeTeamTab }) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  const profile = useSelector((state) => state.profile.data);
  const userId = profile?._id;
  const { data: users } = useSelector((state) => state.user);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  useEffect(() => {
    if (activeTeamTab !== "Activity") return;

    const socketServerUrl = "http://localhost:4000"; // Replace with your actual socket server URL
    const newSocket = io(socketServerUrl);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      setSocket(newSocket);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setSocket(null);
    });

    newSocket.on("receiveMessage", (message) => {
      console.log("real time received", message);
      if (
        message.senderId === selectedRecipientId ||
        message.recipientId === userId
      ) {
        setRealTimeMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log("Socket connection closed");
      }
    };
  }, [activeTeamTab, userId, selectedRecipientId]);

  useEffect(() => {
    if (selectedRecipientId) {
      dispatch(fetchMessages({ userId, recipientId: selectedRecipientId }));
    }
  }, [selectedRecipientId, userId, dispatch]);

  const sendMessageHandler = () => {
    if (newMessage.trim() === "" || !selectedRecipientId) return;

    const message = {
      senderId: userId,
      recipientId: selectedRecipientId,
      content: newMessage,
    };

    if (socket) {
      socket.emit("sendMessage", message);
    }

    dispatch(sendMessage(message));
    setNewMessage("");
  };

  const handleUserClick = (recipientId) => {
    setSelectedRecipientId(recipientId);
    setRealTimeMessages([]); // Reset real-time messages for the new recipient
  };

  const combinedMessages = [...realTimeMessages, ...messages].filter(
    (message) =>
      (message.senderId === userId &&
        message.recipientId === selectedRecipientId) ||
      (message.senderId === selectedRecipientId &&
        message.recipientId === userId)
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-lg font-bold mb-2">All Users</h2>
        <ul>
          {users
            ?.filter((user) => user._id !== userId)
            .map((user) => (
              <li
                key={user._id}
                className={`cursor-pointer p-2 ${
                  selectedRecipientId === user._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleUserClick(user._id)}
              >
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="messages flex-1 overflow-y-auto mb-4">
          {combinedMessages.length === 0 ? (
            <div className="text-center">No messages yet.</div>
          ) : (
            combinedMessages.map((message, index) => {
              const sender =
                message.senderId === userId
                  ? profile
                  : users.find((user) => user._id === message.senderId);
              const isSender = message.senderId === userId;
              return (
                <div
                  key={index}
                  className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={sender?.profilePicture} alt="User" />
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      isSender ? "chat-bubble-primary" : "chat-bubble-secondary"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="chat-footer opacity-50">
                    {sender?.firstName} {sender?.lastName}
                  </div>
                </div>
              );
            })
          )}
        </div>
        {selectedRecipientId && (
          <div className="flex">
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
              <IoSend />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
