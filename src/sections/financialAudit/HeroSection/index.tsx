'use client'

import { useTranslations } from 'next-intl'

import { FinancialAuditIDs } from '@/consts'

import { AUDIT_YEARS, getYearData } from '../data'
import SplitHeading from '../_shared/SplitHeading'
import AnimatedGlowBackground from '@/components/AnimatedGlowBackground'
import style from './style.module.scss'

type Props = {
  year: number
  onYearChange: (year: number) => void
}

const HeroSection = ({ year, onYearChange }: Props) => {
  const t = useTranslations('financialAudit.hero')

  const pending = getYearData(year).pending === true

  return (
    <section id={FinancialAuditIDs.Hero} className={style.smokeBg}>
      <AnimatedGlowBackground />

      <div className={style.hero}>
        <SplitHeading
          as="h1"
          serif={t('titleSerif')}
          bold={t('titleBold')}
          className={style.title}
        />

        <p className={style.desc}>{t('description')}</p>

        <div className={style.yearTabs}>
          {AUDIT_YEARS.map(y => (
            <button
              key={y}
              type="button"
              className={`${style.yearTab} ${y === year ? style.active : ''}`}
              aria-pressed={y === year}
              onClick={() => onYearChange(y)}
            >
              {y}
            </button>
          ))}
        </div>

        {pending ? (
          <div className={`${style.yearNote} ${style.pending}`}>{t('pendingNote')}</div>
        ) : (
          <div className={style.yearNote}>{t('yearNote')}</div>
        )}
      </div>
    </section>
  )
}

export default HeroSection
