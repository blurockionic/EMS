// src/components/utilities-components/Chat.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  selectMessages,
  addMessage,
} from "../../Redux/slices/chatSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import useSocket from "../../hooks/useSocket";

const Chat = ({ activeTeamTab }) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const [newMessage, setNewMessage] = useState("");
  const profile = useSelector((state) => state.profile.data);
  const userId = profile?._id;
  const { data: users } = useSelector((state) => state.user);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  const socket = useSocket(userId, activeTeamTab === "Activity");

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile());
      dispatch(fetchUsers());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedRecipientId) {
      dispatch(fetchMessages({ userId, recipientId: selectedRecipientId }));
    }
  }, [dispatch, userId, selectedRecipientId]);

  useEffect(() => {
    if (socket) {
      socket.on("newPrivateMessage", (message) => {
        console.log("real time message me kya aa rha ",message);
        dispatch(addMessage(message));
      });
    }

    return () => {
      if (socket) {
        socket.off("newPrivateMessage");
      }
    };
  }, [socket, dispatch]);

  const handleUserClick = (recipientId) => {
    setSelectedRecipientId(recipientId);
    dispatch(fetchMessages({ userId, recipientId }));
  };

  const sendMessageHandler = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: userId,
      recipientId: selectedRecipientId,
      content: newMessage,
    };

    // Optimistically add the message to the local state
    const localMessage = {
      ...message,
      sender: {
        _id: userId,
        profilePicture: profile.profilePicture,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
      recipient: { _id: selectedRecipientId },
    };

    dispatch(addMessage(localMessage));

    // Clear the input field
    setNewMessage("");

    // Send the message to the server
    dispatch(sendMessage(message));

    if (socket) {
      socket.emit("sendMessage", message);
    }
  };

  const getUserMessages = (recipientId) => {
    return messages.filter(
      (message) =>
        (message.sender._id === userId &&
          message.recipient._id === recipientId) ||
        (message.sender._id === recipientId && message.recipient._id === userId)
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
                  className={`flex items-start ${
                    message.sender._id === userId
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div className="flex flex-col items-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        message.sender._id === userId
                          ? message.sender.profilePicture
                          : message.recipient.profilePicture
                      }
                      alt="User"
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {message.sender.firstName} {message.sender.lastName}
                    </span>
                  </div>
                  <div
                    className={`bg-gray-200 p-2 rounded-lg max-w-xs break-words ${
                      message.sender._id === userId
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {message.content}
                  </div>
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
