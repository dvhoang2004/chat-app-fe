import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarEvent.css'
import { useEvents } from '../../context/eventContext'
import AddEventModal from '../../components/AddEventModal/AddEventModal'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { 'en-US': enUS }
})

const CalendarPage = () => {
  const { events } = useEvents()
  const [selectedDate, setSelectedDate] = useState(null)

  // convert our events to react-big-calendar format
  const calendarEvents = events.map(e => ({
    id: e.id,
    title: e.title,
    start: new Date(`${e.date}T${e.time || "00:00"}`),
    end: new Date(`${e.date}T${e.time || "00:00"}`),
    color: e.color
  }))

  const handleSelectSlot = ({ start }) => {
    const dateStr = format(start, 'yyyy-MM-dd')
    setSelectedDate(dateStr)
  }

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '8px',
      border: 'none',
      color: '#fff',
      fontSize: '12px',
      padding: '2px 6px'
    }
  })

  return (
    <div className="calendar-page">
      <h2 className="calendar-page-title">Calendar</h2>

      <div className="calendar-wrap">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          toolbar={false}
          style={{ height: '100%' }}
        />
      </div>

      {selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}

export default CalendarPage