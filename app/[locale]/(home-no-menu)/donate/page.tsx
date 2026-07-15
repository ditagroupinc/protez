import type { Metadata } from 'next'
import Donate from '@/sections/donate/Donate'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Зробити пожертву — Protez Foundation' : 'Donate — Protez Foundation'

  const description = isUk
    ? 'Підтримайте Protez Foundation: ваші пожертви оплачують протези, навчання та реабілітацію для українців, які втратили кінцівки на війні.'
    : 'Support Protez Foundation: your donations cover prostheses, training, and rehabilitation for Ukrainians who lost limbs in the war.'

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/donate'),
  }
}

export default async function DonatePage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <Donate />
}
