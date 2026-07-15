import type { Metadata } from 'next'
import ArtemSvergun from '@/sections/stories/ArtemSvergun'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Історія Артема Свергуна — Protez Foundation'
    : "Artem Svergun's Story — Protez Foundation"

  const description = isUk
    ? 'Історія Артема Свергуна — українського захисника, шлях якого до нового життя з протезом розпочався за підтримки Protez Foundation.'
    : "The story of Artem Svergun — a Ukrainian defender whose journey to a new life with a prosthesis began with Protez Foundation's support."

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/stories/artem-svergun'),
  }
}

export default async function ArtemSvergunPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <ArtemSvergun />
}
