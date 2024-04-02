import { getAllSections, getCountry } from '@/lib/api'
import ClientSections from '@/sections/ClientSections'
import { parseNews, parseStatistics, parseEvents, parsePressRelease } from '@/utils/parsers'
// todo check textContainer className through components (should be above text HTML tags)

export default async function Home() {
  const { news, statistics, events, pressReleases } = await getPosts()

  const country = await getCurrentContry()

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
  const posts = await getAllSections()

  let newsData = {}
  let eventsData = {}

  let statisticsData = {}
  let pressReleaseData = {}

  posts.forEach((post, index) => {
    const node = post.node
    if (node.title === 'Statistics') {
      statisticsData = node.content
    } else if (node.title === 'Events') {
      eventsData = node.content
    } else if (node.title === 'News') {
      newsData = node.content
    } else if (node.title === 'PressRelease') {
      pressReleaseData = node.content
    }
  })

  return {
    news: parseNews(newsData),
    statistics: parseStatistics(statisticsData),
    events: parseEvents(eventsData),
    pressReleases: parsePressRelease(pressReleaseData),
  }
}

async function getCurrentContry() {
  const country = await getCountry()

  return country.countryName
}
