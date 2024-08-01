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
        msg: "Ho cliccato il pulsante",
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
      <h1>Client con Websocket connessa a server Phoenix</h1>
      <div className="card">
        <button onClick={logClick}>
          Messaggi inviati al server: {count}
        </button>
      </div>
    </>
  );
}

export default App;
