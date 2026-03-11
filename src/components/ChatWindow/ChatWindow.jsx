import { useRef, useEffect, useState } from "react"
import './ChatWindow.css'
import { useChat } from "../../context/chatContext"

function ChatWindow({ contact }) {
  const { sendMessage } = useChat()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [contact.chatHistory.length])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input)
    setInput("")
  }

  const handleKey = (e) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <div className="chat-window">

      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div
            className="contact-avatar"
            style={{ background: contact.avatarColor }}
          >
            {contact.avatar}
          </div>
          <div>
            <h3 className="chat-contact-name">{contact.name}</h3>
            <p className="chat-contact-sub">from : {contact.country}</p>
          </div>
        </div>
        <div className="chat-header-right">
          <span className="chat-status">Status: Sale ▾</span>
          <span className="chat-bell">🔔</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {contact.chatHistory.map(msg => (
          <div
            key={msg.id}
            className={`message-row ${msg.from === "me" ? "me" : "them"}`}
          >
            {msg.from === "them" && (
              <div
                className="contact-avatar small"
                style={{ background: contact.avatarColor }}
              >
                {contact.avatar}
              </div>
            )}
            <div className="message-bubble-wrap">
              <div className={`message-bubble ${msg.from === "me" ? "me" : "them"}`}>
                {msg.text}
              </div>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons */}
      <div className="chat-actions">
        <button className="action-btn">REQUEST VISIT</button>
        <button className="action-btn">MAKE OFFER</button>
      </div>

      {/* Input */}
      <div className="chat-input-bar">
        <span className="chat-emoji">😊</span>
        <input
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="chat-send-btn" onClick={handleSend}>➤</button>
      </div>
    </div>
  )
}

export default ChatWindow