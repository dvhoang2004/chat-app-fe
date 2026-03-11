import React, { useState } from 'react'
import './Chat.css'
import { contacts as defaultContacts } from "../../data/contacts"
import ChatList from "../../components/ChatList/ChatList"
import ChatWindow from "../../components/ChatWindow/ChatWindow"
import { useChat } from "../../context/chatContext"

// load from localStorage, fall back to contacts.js
const loadContacts = () => {
  try {
    const saved = localStorage.getItem("nexlab_contacts")
    return saved ? JSON.parse(saved) : defaultContacts
  } catch {
    return defaultContacts
  }
}

//For chat page, include a chat box and a list of contacts on the left side.
const Chat = () => {
  const { contacts, selectedId, setSelectedId } = useChat()
  const selectedContact = contacts.find(c => c.id === selectedId)

  return (
    <div className="chat-layout">
      <ChatList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ChatWindow contact={selectedContact} />
    </div>
  )
}

export default Chat
