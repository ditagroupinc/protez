// import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import CountUp from 'react-countup'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '@/consts'

// =================================================================

interface AcademyResultCardProps {
  count: number
  title: string
  className?: string
}

const AcademyResultCard = ({ count, title, className }: AcademyResultCardProps) => {
  return (
    <TextAppearanceWrapper className={`${style.academyResultCard} ${className}`}>
      <CountUp end={count} duration={2} className={style.count} />
      <p className={style.desc}>{title}</p>
    </TextAppearanceWrapper>
  )
}

const academyResultsCount = [92, 26, 9, 2] as const

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
    <Section id={AcademyIDs.OurResults} className={style.academyResults}>
      <div className={style.resultsContent}>
        <div className={style.leftPart}>
          <div className={style.sectionTitle}>{icons.academyResultsTitle()}</div>
          <div className={style.resultsInfo}>
            <div className={style.infoWrapper}>
              <p className={style.date}>
                (May 2022 – September 2023)
                {/* {texts.academyResults.date[lang]} */}
              </p>
              <p className={style.desc}>
                Ukrainian Specialists already went through the Program and back in their home
                country helping restore the lives of those who lost limbs during the war
                {/* {texts.academyResults.description[lang]} */}
              </p>
            </div>
            <div className={style.btnGroup}>
              <Button
                as="link"
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                target="_blank"
                variant="primary-blue"
                rel="noopener noreferrer"
                size="normal"
              >
                Apply to Academy
                {/* {texts.academyHeader.buttons.applyToAcademy[lang]} */}
              </Button>
              <Button as="link" href="/donate" variant="secondary-black" size="normal">
                Support Academy
                {/* {texts.academyHeader.buttons.supportAcademy[lang]} */}
                {icons.arrowUp(`${style.arrowUpIcon}`)}
              </Button>
            </div>
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
    </Section>
  )
}

export default OurResults
