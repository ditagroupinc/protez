'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/AcademyButton'

import AcademySection from '@/components/AcademySection'
import AcademyResultCard from './components/AcademyResultCard'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '@academy/consts'
import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '@academy/consts/links'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import ProtezImage from '@/components/ProtezImage'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

type Stat = { value: number; label: string }

const OurResults = () => {
  const t = useTranslations('academy')
  const { desktop: titleDesktop } = useAcademyTitle('our-results')
  const stats = t.raw('ourResults.stats') as Stat[]

  return (
    <AcademySection id={AcademyIDs.OurResults} className={style.academyResults}>
      <div className={style.resultsContent}>
        <div className={style.leftPart}>
          <TextAppearanceWrapper className={style.title}>
            <ProtezImage {...titleDesktop} />
          </TextAppearanceWrapper>
          <div className={style.resultsInfo}>
            <TextAppearanceWrapper className={style.infoWrapper}>
              <p className={style.date}>{t('ourResults.datesRange')}</p>
              <p className={style.desc}>{t('ourResults.description')}</p>
            </TextAppearanceWrapper>
            <TextAppearanceWrapper className={style.btnGroup}>
              <Button
                as="link"
                href={ACADEMY_APPLY_FORM_URL}
                target={'_blank'}
                variant="primary-blue"
                rel="noopener noreferrer"
                size="big"
              >
                {t('cta.apply')}
              </Button>
              <Button as="link" href={DONATE_URL} variant="normal-black" size="big">
                {t('cta.support')}
                {icons.arrowUp(`${style.arrowUpIcon}`)}
              </Button>
            </TextAppearanceWrapper>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.leftWrapper}>
            {stats.slice(0, 2).map((stat, index) => (
              <AcademyResultCard
                key={index}
                title={stat.label}
                count={stat.value}
                className={style.card}
              />
            ))}
          </div>
          <div className={style.rightWrapper}>
            {stats.slice(2).map((stat, index) => (
              <AcademyResultCard
                key={index}
                title={stat.label}
                count={stat.value}
                className={style.card}
              />
            ))}
          </div>
        </div>
      </div>
    </AcademySection>
  )
}

export default OurResults
