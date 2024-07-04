import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SongContext from './components/SongContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SongContext>
    <App />
    </SongContext>
  </React.StrictMode>,
)
