import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Languages } from '@/types'
import NumberColumn from './components/NumberColumn'
import { Statistics } from '@/utils/parsers'

const OurResults = ({ results }: { results: Statistics }) => {
  const { lang } = useLanguage()
  const ukrainianClassName = lang === 'ukrainian' ? style.ukrainian : ''

  return (
    <section className={`${style.section} section`} id="ourResults">
      <div className={`${style.block}`}>
        <TextAppearanceWrapper className={`${style.leftBlock} ${ukrainianClassName}`}>
          {icons.ourResultsLogo[lang](`svgTextBlock `)}
          <h2 className={`h2 ${style.date}`}>{results.statisticsDate[lang]}</h2>
        </TextAppearanceWrapper>

        <div className={`${style.countBlock}`}>
          {results.statisticsData.map((card, i) => (
            <NumberColumn
              text={card.statisticsDataLabel[lang]}
              number={card.statisticsDataValue}
              key={i}
              isUkrainianLanguage={lang === Languages.Ukrainian}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurResults
