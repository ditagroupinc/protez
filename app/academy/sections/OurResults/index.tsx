// import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@academy/components/Button'

import AcademySection from '@academy/components/AcademySection'
import AcademyResultCard from './components/AcademyResultCard'

// import texts from '@academy/components/texts-svg'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

// =================================================================

const academyResultsCount = [92, 26, 9, 2] as const

// type ResultStatistics = Record<string, { english: string; ukrainian: string }>

const resultStatistics = [
  'People received prosthetics',
  'Specialists trained',
  'Prostheses were provided',
  'Summits were organized',
]

// =================================================================

const OurResults = () => {
  // const { lang } = useLanguage()

  return (
    <AcademySection id={AcademyIDs.OurResults} className={style.academyResults}>
      <div className={style.resultsContent}>
        <div className={style.leftPart}>
          <TextAppearanceWrapper className={style.sectionTitle}>
            {icons.academyResultsTitle()}
          </TextAppearanceWrapper>
          <div className={style.resultsInfo}>
            <TextAppearanceWrapper className={style.infoWrapper}>
              <p className={style.date}>
                (May 2022 – September 2023)
                {/* {texts.academyResults.date[lang]} */}
              </p>
              <p className={style.desc}>
                Ukrainian Specialists already went through the Program and back in their home
                country helping restore the lives of those who lost limbs during the war
                {/* {texts.academyResults.description[lang]} */}
              </p>
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
                Apply to Academy
                {/* {texts.academyHeader.buttons.applyToAcademy[lang]} */}
              </Button>
              <Button as="link" href="/donate" variant="normal-black" size="big">
                Support Academy
                {/* {texts.academyHeader.buttons.supportAcademy[lang]} */}
                {icons.arrowUp(`${style.arrowUpIcon}`)}
              </Button>
            </TextAppearanceWrapper>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.leftWrapper}>
            {resultStatistics.slice(0, 2).map((statistics, index) => (
              <AcademyResultCard
                key={index}
                title={statistics}
                count={academyResultsCount[index]}
                className={style.card}
              />
            ))}
          </div>
          <div className={style.rightWrapper}>
            {resultStatistics.slice(2).map((statistics, index) => (
              <AcademyResultCard
                key={index}
                title={statistics}
                count={academyResultsCount[index + 2]}
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
