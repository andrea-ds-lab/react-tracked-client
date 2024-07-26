import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import socket from './sockets/socket';
import { useWebSocket } from './sockets/websocketContext';

function App() {
  const [count, setCount] = useState(0);
  const { channel } = useWebSocket(); // Ensure the hook is used correctly

  useEffect(() => {
    const channel = socket.channel("testing_channel:lobby", {});

    channel.join()
      .receive("ok", (response) => {
        console.log("Joined successfully", response);
      })
      .receive("error", (response) => {
        console.log("Unable to join", response);
      });

    // Handle incoming messages
    channel.on("new_msg", (payload) => {
      console.log("New message received:", payload);
    });

    // Cleanup on unmount
    return () => {
      channel.leave();
    };
  }, []);

  const logClick = () => {
    if (channel) {
      channel.push("new_msg", {
        msg: "bellaaaa",
        count: count,
      }, 1000);
      setCount(count + 1);
    }
    console.log(channel)
  };

  return (
    <>
      <h1>Client con Websocket a Phoenix</h1>
      <div className="card">
        <button onClick={logClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
