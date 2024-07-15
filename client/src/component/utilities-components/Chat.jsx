// src/components/utilities-components/Chat.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  selectMessages,
  clearMessages,
} from "../../Redux/slices/chatSlice"; // Adjust path as per your project structure

import { fetchProfile } from "../../Redux/slices/profileSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const [newMessage, setNewMessage] = useState("");
  const profile = useSelector((state) => state.profile.data);
  const userId = profile?._id; // Assuming user id is stored in profile._id
  const { data: users } = useSelector((state) => state.user);

  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedRecipientId) {
      dispatch(fetchMessages({ userId, recipientId: selectedRecipientId }));
    }
  }, [dispatch, userId, selectedRecipientId]);

  const handleUserClick = (recipientId) => {
    setSelectedRecipientId(recipientId);
    dispatch(clearMessages());
    dispatch(fetchMessages({ userId, recipientId }));
  };

  const sendMessageHandler = () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: userId,
      recipientId: selectedRecipientId,
      content: newMessage,
    };

    dispatch(sendMessage(message));
    setNewMessage("");
  };

  const getUserMessages = (recipientId) => {
    return messages.filter(
      (message) =>
        (message.senderId === userId && message.recipientId === recipientId) ||
        (message.senderId === recipientId && message.recipientId === userId)
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
                  className={`p-2 rounded-lg ${
                    message.senderId === userId
                      ? "bg-blue-200 self-end"
                      : "bg-gray-200"
                  }`}
                >
                  {message.content}
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
