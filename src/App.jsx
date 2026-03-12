import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'                    
import Navbar from './components/SideNavbar/SideNavbar'
import ChatPage from "./pages/Chat/Chat"
import PropertiesPage from "./pages/Properties/Properties"
import CalendarPage from "./pages/Calendar/Calendar"
import OffersPage from "./pages/Offers/Offers"
import DocumentsPage from "./pages/Documents/Documents"
import SettingsPage from "./pages/Settings/Settings"
import { ChatProvider } from "./context/chatContext"
import { InvitationProvider } from './context/invitationContext'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route 
            path="/chat" 
            element={
              <ChatProvider>
                <ChatPage />
              </ChatProvider>
            }
          />
          <Route 
            path="/" 
            element={
              <ChatProvider>
                <ChatPage />
              </ChatProvider>
            } 
          />
          <Route path="/" element={<ChatPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route 
            path="/offers" 
            element={
              <InvitationProvider>
                <OffersPage />
              </InvitationProvider>
            } 
          />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
