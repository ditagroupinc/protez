import type { Metadata } from 'next'
import VadymFedorov from '@/sections/stories/VadymFedorov'
import { setRequestLocale } from 'next-intl/server'

export const dynamic = 'force-static'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Історія Вадима Федорова — Protez Foundation'
    : "Vadym Fedorov's Story — Protez Foundation"

  const canonicalPath = isUk ? '/ua/stories/vadym-fedorov' : '/stories/vadym-fedorov'

  return {
    title,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/stories/vadym-fedorov`,
        'uk-UA': `${SITE_URL}/ua/stories/vadym-fedorov`,
        'x-default': `${SITE_URL}/stories/vadym-fedorov`,
      },
    },
  }
}

export default async function VadymFedorovPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <VadymFedorov />
}
