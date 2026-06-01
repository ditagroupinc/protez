import type { Metadata } from 'next'
import ThankYou from '@/sections/thank-you/ThankYou'
import { setRequestLocale } from 'next-intl/server'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Дякуємо — Protez Foundation' : 'Thank You — Protez Foundation'

  const canonicalPath = isUk ? '/ua/thank-you' : '/thank-you'

  return {
    title,
    robots: { index: false, follow: false },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/thank-you`,
        'uk-UA': `${SITE_URL}/ua/thank-you`,
        'x-default': `${SITE_URL}/thank-you`,
      },
    },
  }
}

export default async function ThankYouPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <ThankYou />
}
