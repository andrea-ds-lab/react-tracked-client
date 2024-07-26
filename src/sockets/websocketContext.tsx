// src/WebSocketContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Channel } from "phoenix";
import socket from "./socket";

interface WebSocketContextType {
  channel: Channel | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps): JSX.Element => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const newChannel = socket.channel("testing_channel:lobby", {});

    newChannel.join()
      .receive("ok", (response) => {
        console.log("Joined successfully", response);
      })
      .receive("error", (response) => {
        console.log("Unable to join", response);
      });

    // Handle incoming messages
    newChannel.on("new_msg", (payload) => {
      console.log("New message received:", payload);
    });

    setChannel(newChannel);

    // Cleanup on unmount
    return () => {
      newChannel.leave();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ channel }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
