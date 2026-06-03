import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import Header from '@/sections/_shared/AcademyHeaderMinimal'

import style from './style.module.scss'

export const dynamic = 'force-static'

type Params = { locale: string }

const SITE_URL = 'https://www.protezfoundation.org'

type TermsSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Правила та умови — Protez Academy' : 'Terms and Conditions — Protez Academy'

  const canonicalPath = isUk ? '/ua/academy/terms-conditions' : '/academy/terms-conditions'

  return {
    title,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${SITE_URL}/academy/terms-conditions`,
        'uk-UA': `${SITE_URL}/ua/academy/terms-conditions`,
        'x-default': `${SITE_URL}/academy/terms-conditions`,
      },
    },
  }
}

export default async function AcademyTermsConditionsPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)
  const t = await getTranslations('termsConditions')
  const sections = t.raw('sections') as TermsSection[]

  return (
    <>
      <Header />
      <main className={style.main}>
        <article className={style.article}>
          <h1 className={style.title}>{t('title')}</h1>
          <p className={style.effectiveDate}>{t('effectiveDate')}</p>
          <p className={style.intro}>{t('intro')}</p>

          {sections.map((section, idx) => (
            <section key={idx} className={style.section}>
              <h2 className={style.sectionHeading}>{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className={style.paragraph}>
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className={style.list}>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className={style.copyright}>{t('copyright')}</p>
        </article>
      </main>
    </>
  )
}
