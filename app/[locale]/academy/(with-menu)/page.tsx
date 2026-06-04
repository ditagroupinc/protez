import type { Metadata } from 'next'
import AcademyHomePage from '@/sections/academy/_root'
import { setRequestLocale } from 'next-intl/server'

export const dynamic = 'force-static'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Protez Academy — Освіта в галузі протезування та реабілітації'
    : 'Protez Academy — Education in Prosthetics and Rehabilitation'

  const description = isUk
    ? 'Protez Academy — освітній проєкт Protez Foundation у співпраці з Century College, University of Minnesota та Concordia University. Ми навчаємо українських протезистів, ортезистів та фахівців з реабілітації доказовій клінічній практиці.'
    : 'Protez Academy is an educational project by Protez Foundation in collaboration with Century College, University of Minnesota, and Concordia University. We train Ukrainian prosthetists, orthotists, and rehabilitation specialists in evidence-based clinical practice.'

  const canonicalPath = isUk ? '/ua/academy' : '/academy'

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
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/academy`,
        'uk-UA': `${SITE_URL}/ua/academy`,
        'x-default': `${SITE_URL}/academy`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${canonicalPath}`,
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

  return <AcademyHomePage />
}
