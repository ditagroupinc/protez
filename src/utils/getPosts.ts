import { getHomeSections } from '@/lib/api'
import { parseOurEvents } from '@/utils/parsers'

export async function getPosts() {
  try {
    const { ourEvents } = await getHomeSections()

    return {
      ourEvents: parseOurEvents(ourEvents),
    }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return {
      ourEvents: parseOurEvents(''),
    }
  }
}
