import { useState } from 'react';
import './App.css';
import { useWebSocket } from './sockets/websocketContext';

function App() {
  const [count, setCount] = useState(0);
  const { channel } = useWebSocket();

  const logClick = () => {
    setCount(count + 1);
    if (channel) {
      channel.push("btn_track", {
        msg: "bellaaaa",
        count: count,
      }, 5000)
        .receive("ok", (response) => {
          console.log("Message sent successfully:", response);
        })
        .receive("error", (response) => {
          console.log("Unable to send message:", response);
        });
    }
  }

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
