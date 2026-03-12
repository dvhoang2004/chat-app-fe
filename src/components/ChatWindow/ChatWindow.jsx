import { useRef, useEffect, useState } from "react"
import './ChatWindow.css'
import { useChat } from "../../context/chatContext"
import FileUpload from "../../assets/attachment.svg"

function ChatWindow({ contact }) {
  const { sendMessage } = useChat()
  const [input, setInput] = useState("")
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [bellDropdownOpen, setBellDropdownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("Sale")
  const [selectedBell, setSelectedBell] = useState("Turn on")
  const [attachedFile, setAttachedFile] = useState(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const notification = ["Turn on", "Mute for 1hr", "Mute for 8hr", "Mute for 24hr", "Until I turn it back on"]

  // reset input + attachment when switching contact
  useEffect(() => {
    setInput("")
    setAttachedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [contact.id])

  // auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [contact.chatHistory.length])

  const handleSend = () => {
    const hasText = input.trim()
    const hasFile = attachedFile

    if (!hasText && !hasFile) return

    if (hasText) sendMessage(input.trim())

    if (hasFile) {
      // Convert file to base64 for storage
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileData = {
          base64: e.target.result,
          fileName: attachedFile.name
        }
        sendMessage(`📎 ${attachedFile.name}`, fileData)
      }
      reader.readAsDataURL(attachedFile)
      setAttachedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }

    setInput("")
  }

  const handleKey = (e) => {
    if (e.key === "Enter") handleSend()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) setAttachedFile(file)
  }

  const removeAttachment = () => {
    setAttachedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleStatusSelect = (value) => {
    setSelectedStatus(value)
    setStatusDropdownOpen(false)
  }

  const handleBellSelect = (value) => {
    setSelectedBell(value)
    setBellDropdownOpen(false)
  }

  return (
    <div className="chat-window">

      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="contact-avatar" style={{ background: contact.avatarColor }}>
            {contact.avatar}
          </div>
          <div>
            <h3 className="chat-contact-name">{contact.name}</h3>
            <p className="chat-contact-sub">from : {contact.country}</p>
          </div>
        </div>

        <div className="chat-header-right">
          {/* Status Dropdown */}
          <div className="dropdown-container">
            <span className="chat-status" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
              Status: {selectedStatus} ▾
            </span>
            {statusDropdownOpen && (
              <div className="dropdown-menu">
                {["Sale", "Mkt", "Dev", "Others"].map(s => (
                  <div key={s} onClick={() => handleStatusSelect(s)}>{s}</div>
                ))}
              </div>
            )}
          </div>

          {/* Bell Dropdown */}
          <div className="dropdown-container">
            <span className="chat-bell" onClick={() => setBellDropdownOpen(!bellDropdownOpen)}>
              🔔 {selectedBell !== "Turn on" ? selectedBell : ""}
            </span>
            {bellDropdownOpen && (
              <div className="dropdown-menu">
                {notification.map(b => (
                  <div key={b} onClick={() => handleBellSelect(b)}>{b}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {contact.chatHistory.map(msg => (
          <div key={msg.id} className={`message-row ${msg.from === "me" ? "me" : "them"}`}>
            {msg.from === "them" && (
              <div className="contact-avatar small" style={{ background: contact.avatarColor }}>
                {contact.avatar}
              </div>
            )}
            <div className="message-bubble-wrap">
              <div className={`message-bubble ${msg.from === "me" ? "me" : "them"}`}>
                {msg.file ? (
                  <a
                    href={msg.file.base64}
                    download={msg.file.fileName}
                    className="file-message"
                  >
                    {msg.file.fileName}
                  </a>
                ) : (
                  msg.text
                )}
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
        <div className="chat-input-container">
          <input
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          {attachedFile && (
            <div className="attachment-item">
              <span>{attachedFile.name}</span>
              <button className="remove-attachment" onClick={removeAttachment}>✕</button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <button className="attachment-btn" onClick={() => fileInputRef.current?.click()}>
          <img src={FileUpload} alt="" />
        </button>
        <button className="chat-send-btn" onClick={handleSend}>➤</button>
      </div>

    </div>
  )
}

export default ChatWindow