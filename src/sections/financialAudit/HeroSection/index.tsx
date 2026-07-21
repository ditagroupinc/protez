'use client'

import { useTranslations } from 'next-intl'

import { AUDIT_YEARS, getYearData } from '../data'
import SplitHeading from '../_shared/SplitHeading'
import style from './style.module.scss'

type Props = {
  year: number
  onYearChange: (year: number) => void
}

const HeroSection = ({ year, onYearChange }: Props) => {
  const t = useTranslations('financialAudit.hero')

  const pending = getYearData(year).pending === true

  return (
    <section className={style.smokeBg}>
      <div className={style.heroFx} aria-hidden="true">
        <span className={`${style.glow} ${style.g1}`} />
        <span className={`${style.glow} ${style.g2}`} />
        <span className={`${style.glow} ${style.g3}`} />
        <span
          className={style.spark}
          style={{ left: '16%', animationDuration: '10s', animationDelay: '0s' }}
        />
        <span
          className={style.spark}
          style={{ left: '34%', animationDuration: '12s', animationDelay: '3s' }}
        />
        <span
          className={style.spark}
          style={{ left: '52%', animationDuration: '9s', animationDelay: '1.5s' }}
        />
        <span
          className={style.spark}
          style={{ left: '64%', animationDuration: '13s', animationDelay: '5s' }}
        />
        <span
          className={style.spark}
          style={{ left: '80%', animationDuration: '11s', animationDelay: '2.5s' }}
        />
      </div>

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
