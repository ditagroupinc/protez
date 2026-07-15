'use client'

import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

import AcademySection from '@/components/AcademySection'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { AcademyIDs } from '@academy/consts'

import { PdfIcon } from './icons'
import style from './style.module.scss'

type DocumentItem = {
  id: string
  title: string
  description: string
  file: string
}

const FoundingDocuments = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academy.foundingDocuments')
  const documents = t.raw('documents') as DocumentItem[]

  return (
    <AcademySection ref={ref} id={AcademyIDs.FoundingDocuments} className={style.section}>
      <TextAppearanceWrapper className={style.header}>
        <h2 className={style.title}>{t('title')}</h2>
        <p className={style.description}>{t('description')}</p>
      </TextAppearanceWrapper>

      <div className={style.grid}>
        {documents.map(doc => (
          <a
            key={doc.id}
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <PdfIcon
              className={style.icon}
              outlineClassName={style.iconOutline}
              lettersClassName={style.iconLetters}
            />
            <div className={style.cardBody}>
              <p className={style.cardTitle}>{doc.title}</p>
              <p className={style.cardDesc}>{doc.description}</p>
            </div>
            <span className={style.cta}>
              {t('cta')}
              <svg
                className={style.ctaIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12L12 4M12 4H5.5M12 4V10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  FoundingDocuments.displayName = 'FoundingDocuments'
}

export default FoundingDocuments
