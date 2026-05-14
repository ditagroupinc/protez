export type Event = {
  date: string
  title: string
  link: string
  photo: string
  location: string
  upcoming?: boolean
}

export type EventData = {
  image: string
  startDate: string
  endDate: string
  title: string
  location: string
  link?: string
}

export interface EventsProps {
  events: EventData[]
}
