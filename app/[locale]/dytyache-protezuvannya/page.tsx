import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'

import ChildrenProstheticsPage from '@/sections/childrenProsthetics/_root'

export const dynamic = 'force-static'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'childrenProsthetics.meta' })

  const isUk = locale === 'uk'
  const canonicalPath = isUk ? '/ua/dytyache-protezuvannya' : '/dytyache-protezuvannya'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/dytyache-protezuvannya`,
        'uk-UA': `${SITE_URL}/ua/dytyache-protezuvannya`,
        'x-default': `${SITE_URL}/dytyache-protezuvannya`,
      },
    },
    openGraph: {
      type: 'article',
      locale: isUk ? 'uk_UA' : 'en_US',
      url: isUk ? `${SITE_URL}/ua/dytyache-protezuvannya` : `${SITE_URL}/dytyache-protezuvannya`,
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function DytyacheProtezuvannyaPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <ChildrenProstheticsPage />
}
