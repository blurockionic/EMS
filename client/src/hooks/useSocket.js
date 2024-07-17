// src/hooks/useSocket.js

import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useSocket = (userId, isActive) => {
  const isConnected = useRef(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socketServerUrl = "http://localhost:4000"; // Replace with your socket server URL

    if (isActive && userId && !isConnected.current) {
      isConnected.current = true;

      socketRef.current = io(socketServerUrl, {
        query: { userId },
      });

      const { current: newSocket } = socketRef;

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from socket server");
        isConnected.current = false;
      });

      return () => {
        if (newSocket) {
          newSocket.close();
          console.log("Socket connection closed");
          isConnected.current = false;
        }
      };
    } else if (!isActive || !userId) {
      if (socketRef.current) {
        socketRef.current.close();
        console.log("Socket connection closed due to inactivity");
        isConnected.current = false;
      }
    }
  }, [isActive, userId]);

  return socketRef.current; // Return the socket reference
};

export default useSocket;
