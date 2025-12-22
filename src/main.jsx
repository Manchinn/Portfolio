import React from 'react' // แก้จาก { React } เป็น React เฉยๆ
import ReactDOM from 'react-dom/client' // แก้จาก { ReactDOM }
import { BrowserRouter } from 'react-router-dom' // เพิ่มบรรทัดนี้!
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)