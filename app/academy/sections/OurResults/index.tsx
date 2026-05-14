import Button from '@academy/components/Button'

import AcademySection from '@academy/components/AcademySection'
import AcademyResultCard from './components/AcademyResultCard'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

const OurResults = () => {
  const t = useAcademyTexts()
  const stats = t.ourResults.stats

  return (
    <AcademySection id={AcademyIDs.OurResults} className={style.academyResults}>
      <div className={style.resultsContent}>
        <div className={style.leftPart}>
          <TextAppearanceWrapper className={style.sectionTitle}>
            {icons.academyResultsTitle()}
          </TextAppearanceWrapper>
          <div className={style.resultsInfo}>
            <TextAppearanceWrapper className={style.infoWrapper}>
              <p className={style.date}>{t.ourResults.datesRange}</p>
              <p className={style.desc}>{t.ourResults.description}</p>
            </TextAppearanceWrapper>
            <TextAppearanceWrapper className={style.btnGroup}>
              <Button
                as="link"
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                target={'_blank'}
                variant="primary-blue"
                rel="noopener noreferrer"
                size="big"
              >
                {t.ourResults.cta.apply}
              </Button>
              <Button as="link" href="/donate" variant="normal-black" size="big">
                {t.ourResults.cta.support}
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
                count={parseInt(stat.value, 10)}
                className={style.card}
              />
            ))}
          </div>
          <div className={style.rightWrapper}>
            {stats.slice(2).map((stat, index) => (
              <AcademyResultCard
                key={index}
                title={stat.label}
                count={parseInt(stat.value, 10)}
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
