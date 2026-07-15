import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import AcademyAboutClient from './AcademyAboutClient'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-static'

type Params = { locale: Locale }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Про Protez Academy — Освіта та реабілітація'
    : 'About Protez Academy — Education and Rehabilitation'

  const description = isUk
    ? 'Дізнайтеся про місію Protez Academy: підготовку українських протезистів, ортезистів та фахівців з реабілітації через партнерство з провідними університетами США.'
    : 'Learn about the mission of Protez Academy: training Ukrainian prosthetists, orthotists, and rehabilitation specialists through partnerships with leading US universities.'

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/academy/about'),
  }
}

export default async function AcademyAboutPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)

  return <AcademyAboutClient />
}
