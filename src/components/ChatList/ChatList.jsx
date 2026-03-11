import React, { useState } from 'react'
import './ChatList.css'
import { useChat } from "../../context/chatContext"

//For the list of chats and search bar to find specific chats
const ChatList = ({ contacts, selectedId, onSelect }) => {
  const [search, setSearch] = useState("")
  const { getUnreadCount } = useChat()

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="contact-list">

      {/* Header */}
      <div className="contact-list-header">
        <h2>Chat</h2>
        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Contacts */}
      <div className="contact-items">
        {filtered.map(contact => {
          const lastMsg = contact.chatHistory?.at(-1)
          const unread = getUnreadCount(contact)
          const isUnread = unread > 0
          
          const previewSender = !lastMsg ? "" : lastMsg.from === "me" ? "Me" : contact.name?.split(" ")[0] ?? ""
          const previewText = lastMsg ? `${previewSender}: ${lastMsg.text}` : "No messages yet"
          
          return (
            <div 
              key={contact.id} 
              className={`contact-row ${selectedId === contact.id ? "active" : ""}`}
              onClick={() => onSelect(contact.id)}
            >
              {/* Avatar with red dot for unread */}
              <div style={{ position: "relative" }}>
                <div className="contact-avatar" style={{ background: contact.avatarColor }}>
                  {contact.avatar}
                </div>
                {isUnread && <div className="unread-indicator"></div>}
              </div>

              {/* Info */}
              <div className="contact-info">
                <div className="contact-top">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-time">{contact.lastSeen}</span>
                </div>
                <p className={`contact-preview ${isUnread ? "unread" : ""}`}>
                  {previewText}
                </p>
              </div>

              {/* Red bubble with unread count */}
              {isUnread && (
                <div className="unread-badge">
                  {unread}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default ChatList
