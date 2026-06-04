import ProtezHomePage from '@/sections/home/_root'
import { getPosts } from '@/utils/getPosts'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

type Params = { locale: string }

export default async function Home({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)
  const { news, statistics, events, pressReleases } = await getPosts()

  return (
    <ProtezHomePage
      news={news}
      statistics={statistics}
      events={events}
      pressReleases={pressReleases}
    />
  )
}
