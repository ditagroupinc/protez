import { getAllSections } from '@/lib/api'
import { parseNews, parseStatistics, parseEvents, parsePressRelease } from '@/utils/parsers'

export interface WPPost extends Record<string, unknown> {
  node: {
    title: string
    content: string
  }
}

const DATA_MAP = {
  Statistics: 'statistics',
  Events: 'events',
  News: 'news',
  PressRelease: 'pressReleases',
} as const

export async function getPosts() {
  try {
    const posts = (await getAllSections()) as WPPost[]

    const postsByTopics = {
      news: '',
      statistics: '',
      events: '',
      pressReleases: '',
    }

    posts.forEach(post => {
      const { title, content } = post.node
      const key = DATA_MAP[title as keyof typeof DATA_MAP]

      if (key) {
        postsByTopics[key as keyof typeof postsByTopics] = content
      }
    })

    return {
      news: parseNews(postsByTopics.news),
      statistics: parseStatistics(postsByTopics.statistics),
      events: parseEvents(postsByTopics.events),
      pressReleases: parsePressRelease(postsByTopics.pressReleases),
    }
  } catch (error) {
    console.error('Error fetching posts:', error)

    return {
      news: parseNews(''),
      statistics: parseStatistics(''),
      events: parseEvents(''),
      pressReleases: parsePressRelease(''),
    }
  }
}
