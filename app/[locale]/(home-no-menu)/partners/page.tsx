import type { Metadata } from 'next'
import Partners from '@/sections/partners/Partners'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Партнери — Protez Foundation' : 'Partners — Protez Foundation'

  const description = isUk
    ? 'Стратегічні партнери Protez Foundation: університети, клініки та компанії, що допомагають надавати протези й реабілітацію українцям.'
    : 'Strategic partners of Protez Foundation: universities, clinics, and companies helping us provide prostheses and rehabilitation to Ukrainians.'

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/partners'),
  }
}

export default async function PartnersPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <Partners />
}
