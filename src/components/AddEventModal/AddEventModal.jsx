import { useState } from 'react'
import './AddEventModal.css'
import { useEvents } from '../../context/eventContext'

const COLORS = ["#6c5ce7", "#00b894", "#e17055", "#fdcb6e", "#0984e3", "#fd79a8"]

const AddEventModal = ({ selectedDate, onClose }) => {
  const { events, addEvent, deleteEvent } = useEvents()
  const [form, setForm] = useState({ title: "", time: "", color: COLORS[0] })
  const [adding, setAdding] = useState(false)

  const dayEvents = events.filter(e => e.date === selectedDate)

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  const handleSubmit = () => {
    if (!form.title.trim()) return
    addEvent({ ...form, date: selectedDate })
    setForm({ title: "", time: "", color: COLORS[0] })
    setAdding(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div>
            <h3>Events</h3>
            <p className="modal-date">{formatDate(selectedDate)}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Existing events */}
        <div className="modal-event-list">
          {dayEvents.length === 0 && !adding && (
            <p className="no-events">No events yet.</p>
          )}
          {dayEvents.map(event => (
            <div key={event.id} className="modal-event-item">
              <div className="event-color-bar" style={{ background: event.color }} />
              <div className="event-info">
                <p className="event-title">{event.title}</p>
                {event.time && <p className="event-time">{event.time}</p>}
              </div>
              <button className="delete-event-btn" onClick={() => deleteEvent(event.id)}>✕</button>
            </div>
          ))}
        </div>

        {/* Add form — only shown when adding */}
        {adding ? (
          <div className="modal-add-form">
            <input
              className="modal-input"
              placeholder="Event title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              onKeyDown={e => { if (e.key === "Enter") handleSubmit() }}
              autoFocus
            />
            <input
              className="modal-input"
              type="time"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
            />
            <div className="color-picker">
              {COLORS.map(color => (
                <div
                  key={color}
                  className={`color-dot ${form.color === color ? "selected" : ""}`}
                  style={{ background: color }}
                  onClick={() => setForm({ ...form, color })}
                />
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn-confirm" onClick={handleSubmit}>Save</button>
              <button className="btn-cancel" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="add-event-btn" onClick={() => setAdding(true)}>+ Add Event</button>
        )}

      </div>
    </div>
  )
}

export default AddEventModal