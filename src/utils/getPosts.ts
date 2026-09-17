import { getHomeSections } from '@/lib/api'
import { parseEvents } from '@/utils/parsers'

export async function getPosts() {
  try {
    const { events } = await getHomeSections()

    return {
      events: parseEvents(events),
    }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return {
      events: parseEvents(''),
    }
  }
}
