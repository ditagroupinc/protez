'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { FinancialAuditIDs } from '@/consts'

import { CATEGORY_COLORS, DONUT_CIRC, DONUT_R, formatPct, getYearData } from '../data'
import { useDrawIn } from '../_shared/useDrawIn'
import Reveal from '../_shared/Reveal'
import FadeSwap from '../_shared/FadeSwap'
import SplitHeading from '../_shared/SplitHeading'
import style from './style.module.scss'

type Props = {
  year: number
  swapping: boolean
}

const ExpenseBreakdown = ({ year, swapping }: Props) => {
  const t = useTranslations('financialAudit.breakdown')
  const locale = useLocale()

  const data = getYearData(year)
  const pending = data.pending === true
  const drawn = useDrawIn(year)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    setActiveIdx(null)
  }, [year])

  const categories = t.raw('categories') as string[]
  const total = data.expenses ? (locale === 'uk' ? data.expenses.uk : data.expenses.en) : ''
  const centerAmount = pending ? t('centerPending') : `$${total}`

  let acc = 0
  const segments = data.cats.map((c, i) => {
    const len = (c.pct / 100) * DONUT_CIRC
    const offset = -((acc / 100) * DONUT_CIRC)

    acc += c.pct

    return { len, offset, color: CATEGORY_COLORS[i] }
  })

  const stateClass = (i: number) =>
    activeIdx === null ? '' : activeIdx === i ? style.active : style.dim

  return (
    <section id={FinancialAuditIDs.Breakdown} className={style.section}>
      <div className={style.inner}>
        <div className={style.head}>
          <SplitHeading as="h2" serif={t('titleSerif')} bold={t('titleBold')} />
          <p className={style.desc}>{t('description')}</p>
        </div>

        <FadeSwap swapping={swapping} className={style.breakdown}>
          <Reveal className={style.donutWrap}>
            <div className={style.donut}>
              <svg className={style.donutSvg} viewBox="0 0 200 200" aria-hidden="true">
                <circle
                  cx="100"
                  cy="100"
                  r={DONUT_R}
                  fill="none"
                  strokeWidth="30"
                  style={{ stroke: 'var(--mint-grey)' }}
                />
                {!pending &&
                  segments.map((s, i) => (
                    <circle
                      key={i}
                      className={`${style.seg} ${stateClass(i)}`}
                      cx="100"
                      cy="100"
                      r={DONUT_R}
                      fill="none"
                      strokeWidth="30"
                      style={{
                        stroke: s.color,
                        strokeDashoffset: s.offset,
                        strokeDasharray: drawn
                          ? `${s.len} ${DONUT_CIRC - s.len}`
                          : `0 ${DONUT_CIRC}`,
                      }}
                      onMouseEnter={() => setActiveIdx(i)}
                      onMouseLeave={() => setActiveIdx(null)}
                    />
                  ))}
              </svg>
              <div className={style.donutCenter}>
                <div className={style.donutAmt}>{centerAmount}</div>
                <div className={style.donutYear}>{t('centerYear', { year: String(year) })}</div>
              </div>
            </div>
          </Reveal>

          <Reveal className={style.catList} delay={0.1}>
            {data.cats.map((c, i) => (
              <div
                key={i}
                className={`${style.catRow} ${stateClass(i)}`}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <span className={style.catDot} style={{ background: CATEGORY_COLORS[i] }} />
                <span className={style.catName}>{categories[i]}</span>
                <span className={style.catAmount}>
                  {locale === 'uk' ? c.amount.uk : c.amount.en}
                </span>
                <span className={style.catPct}>
                  {pending ? '—' : `${formatPct(c.pct, locale)}%`}
                </span>
              </div>
            ))}
          </Reveal>
        </FadeSwap>
      </div>
    </section>
  )
}

export default ExpenseBreakdown
