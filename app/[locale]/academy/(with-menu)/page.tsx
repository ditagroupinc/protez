import type { Metadata } from 'next'
import AcademyHomePage from '@/sections/academy/_root'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates, localeUrl } from '@/lib/seo'
import { getCurrentMonth } from '@/lib/date'

export const revalidate = 86400

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Protez Academy — Освіта в галузі протезування та реабілітації'
    : 'Protez Academy — Education in Prosthetics and Rehabilitation'

  const description = isUk
    ? 'Protez Academy — освітній проєкт Protez Foundation у співпраці з Century College, University of Minnesota та Concordia University. Ми навчаємо українських протезистів, ортезистів та фахівців з реабілітації доказовій клінічній практиці.'
    : 'Protez Academy is an educational project by Protez Foundation in collaboration with Century College, University of Minnesota, and Concordia University. We train Ukrainian prosthetists, orthotists, and rehabilitation specialists in evidence-based clinical practice.'

  return {
    title,
    description,
    keywords: [
      'Protez Academy',
      'prosthetics education',
      'rehabilitation training',
      'Ukraine prosthetics',
      'amputee rehab',
      'orthotics training',
    ],
    alternates: buildAlternates(locale, '/academy'),
    openGraph: {
      type: 'website',
      url: localeUrl(locale, '/academy'),
      title,
      description,
      images: [
        {
          url: '/og/protez-academy-og.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/protez-academy-og.png'],
    },
  }
}

export default async function AcademyPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <AcademyHomePage currentMonth={getCurrentMonth()} />
}
