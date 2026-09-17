'use client'

import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useLocale, useTranslations } from 'next-intl'

import { FinancialAuditIDs } from '@/consts'

import { getYearData } from '../data'
import Reveal from '../_shared/Reveal'
import FadeSwap from '../_shared/FadeSwap'
import SplitHeading from '../_shared/SplitHeading'
import style from './style.module.scss'

type Props = {
  year: number
  swapping: boolean
}

const YearStats = ({ year, swapping }: Props) => {
  const t = useTranslations('financialAudit.stats')
  const locale = useLocale()

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const data = getYearData(year)
  const budgetText = data.revenue ? `$${locale === 'uk' ? data.revenue.uk : data.revenue.en}` : '—'
  const separator = locale === 'uk' ? ' ' : ','

  return (
    <section id={FinancialAuditIDs.Stats} className={style.section}>
      <div className={style.inner}>
        <div className={style.head}>
          <SplitHeading
            as="h2"
            serif={t('titleSerif')}
            bold={t('titleBold', { year: String(year) })}
          />
        </div>

        <div ref={ref}>
          <FadeSwap swapping={swapping} className={style.grid}>
            <Reveal delay={0}>
              <div className={style.card}>
                <div className={style.num}>
                  {data.patients !== null ? (
                    <>
                      <span className={style.plus}>+</span>
                      <span>
                        {inView ? (
                          <CountUp
                            key={year}
                            end={data.patients}
                            duration={0.9}
                            separator={separator}
                          />
                        ) : (
                          0
                        )}
                      </span>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </div>
                <div className={style.label}>{t('patientsLabel')}</div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={style.card}>
                <div className={style.num}>{budgetText}</div>
                <div className={style.label}>{t('budgetLabel')}</div>
              </div>
            </Reveal>
          </FadeSwap>
        </div>
      </div>
    </section>
  )
}

export default YearStats
