import { createContext, useContext, useState } from "react"
import { contacts as defaultContacts } from "../data/contacts"

const ChatContext = createContext(null)

const loadContacts = () => {
  try {
    const saved = localStorage.getItem("nexlab_contacts")
    return saved ? JSON.parse(saved) : defaultContacts
  } catch {
    return defaultContacts
  }
}

const saveContacts = (contacts) => {
  localStorage.setItem("nexlab_contacts", JSON.stringify(contacts))
}

const getUnreadCount = (contact) => (contact.chatHistory ?? []).filter(m => m.from === "them" && !m.isRead).length

const parseDateTime = (dateStr, timeStr) => {
  // Format: "DD-MMM-YYYY" and "HH:MM"
  const months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }
  const [day, month, year] = dateStr.split('-')
  const monthNum = months[month]
  return new Date(`${year}-${monthNum}-${day}T${timeStr}:00`)
}

const getSortedContacts = (contacts) => {
  const getLatestDateTime = (contact) => {
    const lastMsg = contact.chatHistory?.at(-1)
    if (!lastMsg) return new Date(0)
    return parseDateTime(lastMsg.date, lastMsg.time)
  }

  return [...contacts].sort((a, b) => {
    const aUnread = getUnreadCount(a) > 0
    const bUnread = getUnreadCount(b) > 0

    // Unread chats first
    if (aUnread && !bUnread) return -1
    if (!aUnread && bUnread) return 1

    // Then sort by latest message date + time (newest first)
    const aDateTime = getLatestDateTime(a)
    const bDateTime = getLatestDateTime(b)
    return bDateTime - aDateTime
  })
}

export function ChatProvider({ children }) {
  const [contacts, setContacts] = useState(loadContacts)
  const [selectedId, setSelectedId] = useState(defaultContacts[0].id)

  const markAsRead = (contactId) => {
    const updated = contacts.map(contact =>
      contact.id === contactId
        ? {
            ...contact,
            chatHistory: contact.chatHistory.map(msg =>
              msg.from === "them" && !msg.isRead
                ? { ...msg, isRead: true }
                : msg
            )
          }
        : contact
    )
    setContacts(updated)
    saveContacts(updated)
  }

  const handleSelectId = (id) => {
    setSelectedId(id)
    markAsRead(id)
  }

  const sendMessage = (text, file = null) => {
    if (!text.trim() && !file) return

    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = String(now.getDate()).padStart(2, '0')
    const month = months[now.getMonth()]
    const year = now.getFullYear()
    const date = `${day}-${month}-${year}`

    const newMessage = {
      id: Date.now(),
      from: "me",
      text: text.trim(),
      date,
      time,
      isRead: true,
      file: file ?? null
    }

    const updated = contacts.map(contact =>
      contact.id === selectedId
        ? { ...contact, chatHistory: [...contact.chatHistory, newMessage] }
        : contact
    )

    setContacts(updated)
    saveContacts(updated)
  }

  return (
    <ChatContext.Provider value={{
      contacts: getSortedContacts(contacts),
      selectedId,
      setSelectedId: handleSelectId,
      sendMessage,
      getUnreadCount,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}