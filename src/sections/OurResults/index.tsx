import { useContext, FunctionComponent } from 'react'
import { LanguageContext } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const NumberColumn = ({
  text,
  number,
  className,
}: {
  text: string
  number: number
  className: string
}) => (
  <div className={`${style.counter} ${className}`}>
    <div>
      <TextAppearanceWrapper reverse className={`${style.title} h2`}>
        {text}
      </TextAppearanceWrapper>
    </div>
    <TextAppearanceWrapper reverse className={`${style.bigNumb}`}>
      {number}
    </TextAppearanceWrapper>
  </div>
)

interface StatisticsData {
  statisticsDataLabel: {
    english: string
    ukrainian: string
  }
  statisticsDataValue: number
}

interface Results {
  statisticsDate: {
    english: string
    ukrainian: string
  }
  statisticsData: StatisticsData[]
}

const OurResults = ({ results }: { results: Results }) => {
  const { lang } = useContext(LanguageContext)
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
              className={ukrainianClassName}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurResults
