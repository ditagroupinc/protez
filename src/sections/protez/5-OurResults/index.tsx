import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import CountUp from 'react-countup'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '@/consts'
import { Body, H2 } from '@/components/Typography'
import Button, { MakeDonationButton } from '@/components/Button'
import { ForwardedRef, forwardRef } from 'react'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const ourResultsText = {
  date: {
    english: 'May 2022 – September 2023',
    ukrainian: `Травень 2022 - Квітень 2024`,
  },
  text: {
    english: `Over the past two years, we have been dedicated to restoring hope and mobility to Ukrainians affected by the war. Through our prosthetics assistance programs, we've empowered countless individuals to reclaim their independence and rebuild their lives. Join us in reflecting on our journey and see the impact we've made together.`,
    ukrainian: `За останні два роки ми невпинно працюємо над поверненням надії та рухливості українцям, які постраждали від війни. Завдяки нашим програмам допомоги з протезуванням, ми допомогли багатьом людям знову стати незалежними та відновити своє життя. Приєднуйтесь до нас, щоб ознайомитися з нашим шляхом та побачити різницю, яку ми зробили разом.`,
  },
  moreResults: {
    english: 'More results',
    ukrainian: 'More results',
  },
  cards: [
    {
      number: 550,
      description: {
        english: 'Prostheses',
        ukrainian: `Встановлено протезів`,
      },
      suffix: '+',
    },
    {
      number: 3,
      description: {
        english: 'Clinics opened',
        ukrainian: `Відкрито клінік`,
      },
    },
    {
      number: 250,
      description: {
        english: 'Patients',
        ukrainian: `Запротезовано пацієнтів`,
      },
      suffix: '+',
    },
    {
      number: 80,
      description: {
        english: 'Specialists trained',
        ukrainian: `Підготовлено спеціалістів`,
      },
      suffix: '+',
    },
    {
      number: 7000000,
      description: {
        english: 'Spent on mission',
        ukrainian: `Витрачено на допомогу`,
      },
      prefix: '$',
    },
  ],
}

const OurResults = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const isDesktopLayout = width > 800

  return (
    <>
      <Section id={ProtezIDs.OurResults} className={style.section} ref={ref}>
        <div className={style.left}>
          {icons.ourResultsLogo.desktop[lang](style.title)}
          <Body large={isDesktopLayout} className={style.date}>
            {ourResultsText.date[lang]}
          </Body>

          <Body large={isDesktopLayout} className={style.text}>
            {ourResultsText.text[lang]}
          </Body>

          {isDesktopLayout && (
            <TextAppearanceWrapper className={style.buttonsContainer}>
              <MakeDonationButton lang={lang} size="normal" />
              <Button as="link" href="/" variant="secondary-white" size="normal" arrow>
                {ourResultsText.moreResults[lang]}
              </Button>
            </TextAppearanceWrapper>
          )}
        </div>
        <div className={style.right}>
          {ourResultsText.cards.map((card, index) => (
            <TextAppearanceWrapper key={index} className={style.card}>
              <div className={style.count}>
                {card.prefix && <span>{card.prefix}</span>}
                <CountUp end={card.number} duration={2} className={style.count} />
                {card.suffix && <span>{card.suffix}</span>}
              </div>
              <H2 className={style.description}>{card.description[lang]}</H2>
            </TextAppearanceWrapper>
          ))}
        </div>
        {!isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} size="normal" />
            <Button as="link" href="/" variant="secondary-white" size="normal" arrow>
              {ourResultsText.moreResults[lang]}
            </Button>
          </TextAppearanceWrapper>
        )}
      </Section>
    </>
  )
})

OurResults.displayName = 'OurResults'
export default OurResults
