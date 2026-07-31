'use client'

import { useLocale, useTranslations } from 'next-intl'

import { FinancialAuditIDs } from '@/consts'

import { AUDIT_YEARS, DEFAULT_YEAR, getYearData } from '../data'
import Reveal from '../_shared/Reveal'
import FadeSwap from '../_shared/FadeSwap'
import SplitHeading from '../_shared/SplitHeading'
import style from './style.module.scss'

type Props = {
  swapping: boolean
}

const YearComparison = ({ swapping }: Props) => {
  const t = useTranslations('financialAudit.comparison')
  const locale = useLocale()

  const patientsCell = (year: number) => {
    const p = getYearData(year).patients

    return p === null ? '—' : String(p)
  }

  const moneyCell = (year: number, field: 'revenue' | 'expenses') => {
    const v = getYearData(year)[field]

    return v ? (locale === 'uk' ? v.uk : v.en) : '—'
  }

  const moneyRows = [
    { key: 'revenue', field: 'revenue' },
    { key: 'expenses', field: 'expenses' },
  ] as const

  return (
    <section id={FinancialAuditIDs.Comparison} className={style.section}>
      <div className={style.inner}>
        <div className={style.head}>
          <SplitHeading as="h2" serif={t('titleSerif')} bold={t('titleBold')} />
        </div>

        <FadeSwap swapping={swapping}>
          <Reveal className={style.tableWrap}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th scope="col">{t('metric')}</th>
                  {AUDIT_YEARS.map(y => (
                    <th key={y} scope="col">
                      {y}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{t('patients')}</th>
                  {AUDIT_YEARS.map(y => (
                    <td key={y} className={y === DEFAULT_YEAR ? style.highlight : ''}>
                      {patientsCell(y)}
                    </td>
                  ))}
                </tr>
                {moneyRows.map(row => (
                  <tr key={row.key}>
                    <th scope="row">{t(row.key)}</th>
                    {AUDIT_YEARS.map(y => (
                      <td key={y} className={y === DEFAULT_YEAR ? style.highlight : ''}>
                        {moneyCell(y, row.field)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </FadeSwap>
      </div>
    </section>
  )
}

export default YearComparison
