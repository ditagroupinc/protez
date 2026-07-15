import type { Metadata } from 'next'
import ProtezHomePage from '@/sections/home/_root'
import { getPosts } from '@/utils/getPosts'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates, localeUrl } from '@/lib/seo'

export const revalidate = 3600

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Protez Foundation — Безкоштовні протези для українців'
    : 'Protez Foundation — Free Prosthetics for Ukrainians'

  const description = isUk
    ? 'Неприбуткова організація 501(c)(3), яка надає сучасні протези, індивідуальне навчання та реабілітацію в США для українців, які втратили кінцівки на війні. Безкоштовно.'
    : 'Nonprofit 501(c)(3) providing state-of-the-art prosthetics, personalized training and rehabilitation in the US for Ukrainians who have lost limbs in the war. Free of charge.'

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      locale: isUk ? 'uk_UA' : 'en_US',
      url: localeUrl(locale, '/'),
      siteName: 'Protez Foundation',
      title,
      description,
      images: [
        {
          url: '/og/protez-foundation-og.png',
          width: 1200,
          height: 630,
          alt: 'Protez Foundation — prosthetics for Ukrainians',
        },
      ],
    },
  }
}

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
