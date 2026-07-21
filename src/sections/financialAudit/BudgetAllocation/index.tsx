'use client'

import { useTranslations } from 'next-intl'

import { BAR_COLORS, getYearData } from '../data'
import { useDrawIn } from '../_shared/useDrawIn'
import Reveal from '../_shared/Reveal'
import FadeSwap from '../_shared/FadeSwap'
import SplitHeading from '../_shared/SplitHeading'
import style from './style.module.scss'

type Props = {
  year: number
  swapping: boolean
}

const BudgetAllocation = ({ year, swapping }: Props) => {
  const t = useTranslations('financialAudit.allocation')

  const data = getYearData(year)
  const pending = data.pending === true
  const drawn = useDrawIn(year)
  const split = data.split

  const rows = [
    { label: t('program'), value: split?.program ?? 0, color: BAR_COLORS.program },
    { label: t('admin'), value: split?.admin ?? 0, color: BAR_COLORS.admin },
    { label: t('fundraising'), value: split?.fund ?? 0, color: BAR_COLORS.fund },
  ]

  return (
    <section className={style.section}>
      <div className={style.inner}>
        <div className={style.head}>
          <SplitHeading as="h2" serif={t('titleSerif')} bold={t('titleBold')} />
        </div>

        <FadeSwap swapping={swapping} className={style.bars}>
          {rows.map((row, i) => (
            <Reveal key={row.label} className={style.barRow} delay={i * 0.1}>
              <div className={style.barLabel}>{row.label}</div>
              <div className={style.barTrack}>
                <div
                  className={style.barFill}
                  style={{
                    width: drawn && !pending ? `${row.value}%` : '0%',
                    background: row.color,
                  }}
                />
              </div>
              <div className={style.barPct}>{pending ? '—' : `${row.value}%`}</div>
            </Reveal>
          ))}
        </FadeSwap>
      </div>
    </section>
  )
}

export default BudgetAllocation
