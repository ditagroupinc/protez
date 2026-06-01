'use client'

import { useTermsConditionsTexts } from '@/hooks/useTermsConditionsTexts'

import Header from '@/sections/_shared/AcademyHeaderMinimal'

import style from './style.module.scss'

export default function AcademyTermsConditionsPage() {
  const t = useTermsConditionsTexts()

  return (
    <>
      <Header />
      <main className={style.main}>
        <article className={style.article}>
          <h1 className={style.title}>{t.title}</h1>
          <p className={style.effectiveDate}>{t.effectiveDate}</p>
          <p className={style.intro}>{t.intro}</p>

          {t.sections.map((section, idx) => (
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

          <p className={style.copyright}>{t.copyright}</p>
        </article>
      </main>
    </>
  )
}
