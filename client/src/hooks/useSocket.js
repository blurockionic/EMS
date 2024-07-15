import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  socketConnect,
  socketDisconnect,
  setOnlineUsers,
  addMessage,
} from "../Redux/slices/socketSlice";

const useSocket = (userId, isActive) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const isConnected = useRef(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (isActive && userId && !isConnected.current) {
      isConnected.current = true; // Set flag to prevent further connections

      socketRef.current = io("http://localhost:4000", {
        query: { userId },
      });

      const { current: newSocket } = socketRef;

      newSocket.on("connect", () => {
        dispatch(socketConnect(newSocket));
        console.log("Connected to socket server");
      });

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      newSocket.on("newPrivateMessage", (message) => {
        dispatch(addMessage(message));
      });

      newSocket.on("disconnect", () => {
        dispatch(socketDisconnect());
        console.log("Disconnected from socket server");
        isConnected.current = false; // Reset flag on disconnect
      });

      return () => {
        if (newSocket) {
          newSocket.close();
          dispatch(socketDisconnect());
          console.log("Socket connection closed");
          isConnected.current = false; // Reset flag on unmount
        }
      };
    } else if (!isActive || !userId) {
      if (socketRef.current) {
        socketRef.current.close();
        dispatch(socketDisconnect());
        console.log("Socket connection closed due to inactivity");
        isConnected.current = false; // Reset flag on inactivity
      }
    }
  }, [isActive, userId, dispatch]);

  return socket;
};

export default useSocket;
