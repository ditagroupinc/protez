import type { Metadata } from 'next'
import VadymFedorov from '@/sections/stories/VadymFedorov'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Історія Вадима Федорова — Protez Foundation'
    : "Vadym Fedorov's Story — Protez Foundation"

  const description = isUk
    ? 'Історія Вадима Федорова — українського військовослужбовця, який отримав сучасний протез та реабілітацію в США за підтримки Protez Foundation.'
    : 'The story of Vadym Fedorov — a Ukrainian serviceman who received a state-of-the-art prosthesis and rehabilitation in the US with the support of Protez Foundation.'

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/stories/vadym-fedorov'),
  }
}

export default async function VadymFedorovPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <VadymFedorov />
}
