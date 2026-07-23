import { getHomeSections } from '@/lib/api'
import { parseStatistics, parseEvents } from '@/utils/parsers'

export async function getPosts() {
  try {
    const { statistics, events } = await getHomeSections()

    return {
      statistics: parseStatistics(statistics),
      events: parseEvents(events),
    }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return {
      statistics: parseStatistics(''),
      events: parseEvents(''),
    }
  }
}
