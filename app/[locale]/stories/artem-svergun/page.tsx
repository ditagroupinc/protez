import type { Metadata } from 'next'
import ArtemSvergun from '@/sections/stories/ArtemSvergun'
import { setRequestLocale } from 'next-intl/server'

export const dynamic = 'force-static'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Історія Артема Свергуна — Protez Foundation'
    : "Artem Svergun's Story — Protez Foundation"

  const canonicalPath = isUk ? '/ua/stories/artem-svergun' : '/stories/artem-svergun'

  return {
    title,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/stories/artem-svergun`,
        'uk-UA': `${SITE_URL}/ua/stories/artem-svergun`,
        'x-default': `${SITE_URL}/stories/artem-svergun`,
      },
    },
  }
}

export default async function ArtemSvergunPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <ArtemSvergun />
}
