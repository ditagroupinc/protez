import { getAllSections, getCountry } from '@/lib/api'
import ClientSections from '@/sections/ClientSections'
import { parseNews, parseStatistics, parseEvents, parsePressRelease } from '@/utils/parsers'
// import { notFound } from 'next/navigation'

export interface WPPost extends Record<string, unknown> {
  node: {
    title: string
    content: string
  }
}

export default async function Home() {
  const { news, statistics, events, pressReleases } = await getPosts()

  const country = await getCurrentCountry()

  // return notFound()
  return (
    <ClientSections
      news={news}
      statistics={statistics}
      events={events}
      pressReleases={pressReleases}
      country={country}
    />
  )
}

async function getPosts() {
  try {
    const posts = (await getAllSections()) as WPPost[]

    const dataMap = {
      Statistics: 'statistics',
      Events: 'events',
      News: 'news',
      PressRelease: 'pressReleases',
    }

    const postsByTopics = {
      news: '',
      statistics: '',
      events: '',
      pressReleases: '',
    }

    posts.forEach(post => {
      const { title, content } = post.node
      const key = dataMap[title as keyof typeof dataMap]

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

async function getCurrentCountry() {
  try {
    const country = await getCountry()

    return country?.countryName || ''
  } catch (error) {
    console.error('Error fetching country:', error)

    return ''
  }
}
