import ProtezHomePage from '@/sections/ProtezHomePage'
import { getCurrentCountry } from '@/utils/getCurrentCountry'
import { getPosts } from '@/utils/getPosts'

export default async function Home() {
  const { news, statistics, events, pressReleases } = await getPosts()
  const country = await getCurrentCountry()

  return (
    <ProtezHomePage
      news={news}
      statistics={statistics}
      events={events}
      pressReleases={pressReleases}
      country={country}
    />
  )
}
