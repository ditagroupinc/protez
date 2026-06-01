import ProtezHomePage from '@/sections/home/_root'
import { getPosts } from '@/utils/getPosts'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Protez Foundation — Free Prosthetics for Ukrainians',
  description:
    'We provide state-of-the-art prosthetics with personalized training and rehabilitation in the US for Ukrainian children, civilians, and soldiers who have lost limbs in the war. Nonprofit 501(c)(3), founded 2022.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://www.protezfoundation.org/',
    title: 'Protez Foundation — Free Prosthetics for Ukrainians',
    description:
      'Free prosthetics and rehabilitation for Ukrainians injured in the war. Over 2500 prostheses provided, 150+ specialists trained.',
    images: ['/og/protez-foundation-home-og.png'],
  },
}

export default async function Home() {
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
