import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "leaflet/dist/leaflet.css";

// fonts import
import "@fontsource/roboto-mono"; // Defaults to weight 400
import "@fontsource/roboto-mono/600.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)
