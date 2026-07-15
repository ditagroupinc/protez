import type { Metadata } from 'next'
import ThankYou from '@/sections/thank-you/ThankYou'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Дякуємо — Protez Foundation' : 'Thank You — Protez Foundation'

  return {
    title,
    robots: { index: false, follow: false },
    alternates: buildAlternates(locale, '/thank-you'),
  }
}

export default async function ThankYouPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <ThankYou />
}
