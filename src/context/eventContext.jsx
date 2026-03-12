import { createContext, useContext, useState } from "react"
import { events as defaultEvents } from "../data/events"

const EventContext = createContext(null)

const loadEvents = () => {
  try {
    const saved = localStorage.getItem("nexlab_events")
    return saved ? JSON.parse(saved) : defaultEvents
  } catch {
    return defaultEvents
  }
}

const saveEvents = (data) => {
  localStorage.setItem("nexlab_events", JSON.stringify(data))
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState(loadEvents)

  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now() }
    const updated = [...events, newEvent]
    setEvents(updated)
    saveEvents(updated)
  }

  const deleteEvent = (id) => {
    const updated = events.filter(e => e.id !== id)
    setEvents(updated)
    saveEvents(updated)
  }

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  return useContext(EventContext)
}