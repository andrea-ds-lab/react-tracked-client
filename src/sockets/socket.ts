// src/socket.ts
import { Socket } from "phoenix";

// Create a new socket instance and connect to the WebSocket endpoint
const socket = new Socket("ws://localhost:4000/socket", { params: { userToken: "134061" } });

// Connect the socket
socket.connect();

// You can now create channels to join and handle events
const channel = socket.channel("testing_channel:lobby", {});

channel.join()
  .receive("ok", (response) => {
    console.log("Joined successfully", response);
  })
  .receive("error", (response) => {
    console.log("Unable to join", response);
  });

export default socket;
