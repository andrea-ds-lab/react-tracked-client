import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Socket
import socket from './sockets/socket.ts'

function App() {

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

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
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
  )
}

export default App
