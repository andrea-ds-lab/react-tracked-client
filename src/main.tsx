import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./assets/css/theme.css"
import { WebSocketProvider } from './sockets/websocketContext.tsx'
import WrappedApp from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WebSocketProvider>
      < WrappedApp />
    </WebSocketProvider>
  </React.StrictMode>,
)
