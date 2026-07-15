import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'

import ChildrenProstheticsPage from '@/sections/childrenProsthetics/_root'
import type { Locale } from '@/lib/i18n'
import { buildAlternates, localeUrl } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'childrenProsthetics.meta' })

  const isUk = locale === 'uk'

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/dytyache-protezuvannya'),
    openGraph: {
      type: 'article',
      locale: isUk ? 'uk_UA' : 'en_US',
      url: localeUrl(locale, '/dytyache-protezuvannya'),
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
