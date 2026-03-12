import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { UserInfoProvider } from "./context/userInfoContext"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserInfoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserInfoProvider>
  </StrictMode>,
)
