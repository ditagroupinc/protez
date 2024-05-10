import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'

import AcademySection from '@/sections/AcademySection'
import AcademyResultCard from '@/sections/AcademyResults/components/AcademyResultCard'

import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

// =================================================================

const academyResultsCount = [92, 26, 9, 2] as const

type ResultStatistics = Record<string, { english: string; ukrainian: string }>

const resultStatistics: ResultStatistics = texts.academyResults.statistics

// =================================================================

const AcademyResults = () => {
  const { lang } = useLanguage()

  return (
    <AcademySection id="academyResults" className={style.academyResults}>
      <div className={style.resultsContent}>
        <div className={style.leftPart}>
          <div className={style.sectionTitle}>{icons.academyResultsTitle()}</div>
          <div className={style.resultsInfo}>
            <div className={style.infoWrapper}>
              <p className={style.date}>{texts.academyResults.date[lang]}</p>
              <p className={style.desc}>{texts.academyResults.description[lang]}</p>
            </div>
            <div className={style.btnGroup}>
              <Button
                as="link"
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                target={'_blank'}
                variant="primary-blue"
                rel="noopener noreferrer"
                size="big"
              >
                {texts.academyHeader.buttons.applyToAcademy[lang]}
              </Button>
              <Button as="link" href="/donate" variant="normal-black" size="big">
                {texts.academyHeader.buttons.supportAcademy[lang]}
                {icons.arrowUp(`${style.arrowUpIcon}`)}
              </Button>
            </div>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.leftWrapper}>
            {Object.keys(resultStatistics)
              .slice(0, 2)
              .map((key, index) => (
                <AcademyResultCard
                  key={index}
                  title={resultStatistics[key][lang]}
                  count={academyResultsCount[index]}
                  className={style.card}
                />
              ))}
          </div>
          <div className={style.rightWrapper}>
            {Object.keys(resultStatistics)
              .slice(2)
              .map((key, index) => (
                <AcademyResultCard
                  key={index}
                  title={resultStatistics[key][lang]}
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

export default AcademyResults
