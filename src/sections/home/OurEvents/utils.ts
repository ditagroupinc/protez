import { Event, EventData } from './types'

// slider requires min 6 elements
export const MIN_OUR_EVENTS = 6

export const padOurEventsToMinimum = (ourEvents: Event[], minCount = MIN_OUR_EVENTS): Event[] => {
  if (ourEvents.length === 0 || ourEvents.length >= minCount) return ourEvents

  return Array.from({ length: minCount }, (_, index) => ({
    ...ourEvents[index % ourEvents.length],
  }))
}

export const modifyAndSortOurEvents = (ourEvents: EventData[]): Event[] => {
  const now = new Date()

  const modifiedOurEvents: Event[] = ourEvents.map(event => {
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

  const upcomingOurEvents = modifiedOurEvents.filter(event => new Date(event.date) > now)
  const pastOurEvents = modifiedOurEvents.filter(event => new Date(event.date) <= now)

  // Sort each category by date
  const sortByDate = (a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime()

  upcomingOurEvents.sort(sortByDate)
  pastOurEvents.sort(sortByDate)

  // Concatenate the sorted arrays
  const sortedOurEvents = [...upcomingOurEvents, ...pastOurEvents]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')

    return `${day}/${month}`
  }

  const ourEventsWithAdjustedData = sortedOurEvents.map(event => {
    return { ...event, date: formatDate(event.date) }
  })

  return ourEventsWithAdjustedData
}
