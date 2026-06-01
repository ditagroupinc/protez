import { Event, EventData } from './types'

export const modifyAndSortEvents = (events: EventData[]): Event[] => {
  const now = new Date()

  const modifiedEvents: Event[] = events.map(event => {
    const eventDate = new Date(event.startDate)

    return {
      date: event.startDate,
      title: event.title,
      link: event.link || '#',
      photo: event.image,
      location: event.location,
      upcoming: eventDate > now,
    }
  })

  const upcomingEvents = modifiedEvents.filter(event => new Date(event.date) > now)
  const pastEvents = modifiedEvents.filter(event => new Date(event.date) <= now)

  // Sort each category by date
  const sortByDate = (a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime()

  upcomingEvents.sort(sortByDate)
  pastEvents.sort(sortByDate)

  // Concatenate the sorted arrays
  const sortedEvents = [...upcomingEvents, ...pastEvents]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')

    return `${day}/${month}`
  }

  const eventsWithAdjustedData = sortedEvents.map(event => {
    return { ...event, date: formatDate(event.date) }
  })

  return eventsWithAdjustedData
}
