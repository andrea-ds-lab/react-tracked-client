import { useEffect, useState } from 'react';
import './App.css';
import { useWebSocket } from './sockets/websocketContext';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http, useBlockNumber, useChainId, useChains, useClient } from 'wagmi';
import { base, mainnet, polygon } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: '482686d94bcc46ed35e83e07b3996bbf', // Replace with your actual project ID
  chains: [mainnet, polygon, base],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);
  const { channel } = useWebSocket();

  const { ...chains } = useChains()
  const chainId = useChainId()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    console.log(chains)
    console.log(chainId)
    console.log("Block number: %d", blockNumber)
  }, [chainId])

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
        <ConnectButton />
      </div>
    </>
  );
}

function WrappedApp() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WrappedApp;
