import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  setOnlineUsers,
  addMessage,
  socketConnect,
  socketDisconnect,
} from "../store/socketSlice";

const SocketProvider = ({ userId, children }) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      query: { userId },
    });

    socket.on("connect", () => {
      dispatch(socketConnect(socket));
      console.log("Connected to socket server");
    });

    socket.on("getOnlineUser", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("newPrivateMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.close();
      dispatch(socketDisconnect());
      console.log("Disconnected from socket server");
    };
  }, [dispatch, userId]);

  return <>{children}</>;
};

export default SocketProvider;
