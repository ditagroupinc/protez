import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import AcademyAboutClient from './AcademyAboutClient'

export const dynamic = 'force-static'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Про Protez Academy — Освіта та реабілітація'
    : 'About Protez Academy — Education and Rehabilitation'

  const canonicalPath = isUk ? '/ua/academy/about' : '/academy/about'

  return {
    title,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/academy/about`,
        'uk-UA': `${SITE_URL}/ua/academy/about`,
        'x-default': `${SITE_URL}/academy/about`,
      },
    },
  }
}

export default async function AcademyAboutPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <AcademyAboutClient />
}
