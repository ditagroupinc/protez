import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { buildAlternates } from '@/lib/seo'

import style from './style.module.scss'

export const dynamic = 'force-static'

type Params = { locale: Locale }

type TermsSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk ? 'Правила та умови — Protez Academy' : 'Terms and Conditions — Protez Academy'

  const description = isUk
    ? 'Правила та умови використання ресурсів Protez Academy: політика курсів, конфіденційність, права та обовʼязки учасників.'
    : 'Terms and conditions for using Protez Academy resources: course policies, privacy, and participant rights and responsibilities.'

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/academy/terms-conditions'),
  }
}

export default async function AcademyTermsConditionsPage({ params }: { params: Params }) {
  const { locale } = await Promise.resolve(params)

  setRequestLocale(locale)
  const t = await getTranslations('termsConditions')
  const sections = t.raw('sections') as TermsSection[]

  return (
    <>
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
