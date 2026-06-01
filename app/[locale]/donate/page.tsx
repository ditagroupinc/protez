import type { Metadata } from 'next'
import Donate from '@/sections/donate/Donate'
import { setRequestLocale } from 'next-intl/server'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Зробити пожертву — Protez Foundation' : 'Donate — Protez Foundation'

  const description = isUk
    ? 'Підтримайте Protez Foundation: ваші пожертви оплачують протези, навчання та реабілітацію для українців, які втратили кінцівки на війні.'
    : 'Support Protez Foundation: your donations cover prostheses, training, and rehabilitation for Ukrainians who lost limbs in the war.'

  const canonicalPath = isUk ? '/ua/donate' : '/donate'

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/donate`,
        'uk-UA': `${SITE_URL}/ua/donate`,
        'x-default': `${SITE_URL}/donate`,
      },
    },
  }
}

export default async function DonatePage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <Donate />
}
