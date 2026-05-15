import Button from '@academy/components/Button'

import AcademySection from '@academy/components/AcademySection'
import AcademyResultCard from './components/AcademyResultCard'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '../../consts/links'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import ProtezImage from '@/components/ProtezImage'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

const OurResults = () => {
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('ourResults')
  const { stats, datesRange, description } = t.ourResults
  const cta = t.cta

  return (
    <AcademySection id={AcademyIDs.OurResults} className={style.academyResults}>
      <div className={style.resultsContent}>
        <div className={style.leftPart}>
          <TextAppearanceWrapper className={style.sectionTitle}>
            <ProtezImage {...titleDesktop} />
          </TextAppearanceWrapper>
          <div className={style.resultsInfo}>
            <TextAppearanceWrapper className={style.infoWrapper}>
              <p className={style.date}>{datesRange}</p>
              <p className={style.desc}>{description}</p>
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
                {cta.apply}
              </Button>
              <Button as="link" href={DONATE_URL} variant="normal-black" size="big">
                {cta.support}
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
