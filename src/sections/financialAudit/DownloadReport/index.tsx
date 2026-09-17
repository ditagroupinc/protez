'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/Button'
import { FinancialAuditIDs } from '@/consts'

import { getYearData } from '../data'
import Reveal from '../_shared/Reveal'
import FadeSwap from '../_shared/FadeSwap'
import style from './style.module.scss'

type Props = {
  year: number
  swapping: boolean
}

const DownloadReport = ({ year, swapping }: Props) => {
  const t = useTranslations('financialAudit.download')

  const data = getYearData(year)
  const reportPdf = data.pending ? null : data.reportPdf

  return (
    <section id={FinancialAuditIDs.Download} className={style.section}>
      <div className={style.inner}>
        <FadeSwap swapping={swapping}>
          <Reveal className={style.card}>
            <div className={style.row}>
              <div className={style.icon} aria-hidden="true">
                ↓
              </div>
              <div className={style.text}>
                <h4 className={style.title}>{t('title', { year: String(year) })}</h4>
                <span className={style.desc}>{t('description')}</span>
              </div>
            </div>

            {reportPdf ? (
              <Button
                as="link"
                external
                href={reportPdf}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary-teal"
                size="normal"
              >
                {t('cta')}
              </Button>
            ) : (
              <Button as="button" disabled aria-disabled variant="primary-teal" size="normal">
                {t('pendingCta')}
              </Button>
            )}
          </Reveal>
        </FadeSwap>
      </div>
    </section>
  )
}

export default DownloadReport
