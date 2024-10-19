import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import CountUp from 'react-countup'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '../../../../app/consts'
import { Body, H2 } from '@/components/Typography'
import ProtezButton, { MakeDonationButton } from '@/components/ProtezButton'
import { ForwardedRef, forwardRef } from 'react'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const ourResultsText = {
  date: {
    english: 'May 2022 – September 2023',
    ukrainian: 'May 2022 – September 2023',
  },
  text: {
    english:
      'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
    ukrainian:
      'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
  },
  moreResults: {
    english: 'More results',
    ukrainian: 'More results',
  },
  cards: [
    {
      number: 550,
      description: 'Prostheses',
      suffix: '+',
    },
    {
      number: 3,
      description: 'Clinics opened',
    },
    {
      number: 250,
      description: 'Patients',
      suffix: '+',
    },
    {
      number: 80,
      description: 'Specialists trained',
      suffix: '+',
    },
    {
      number: 5500000,
      description: 'Spent on mission',
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
              <ProtezButton as="link" href="/" variant="secondary-white" size="normal" arrow>
                {ourResultsText.moreResults[lang]}
              </ProtezButton>
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
              <H2 className={style.description}>{card.description}</H2>
            </TextAppearanceWrapper>
          ))}
        </div>
        {!isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} size="normal" />
            <ProtezButton as="link" href="/" variant="secondary-white" size="normal" arrow>
              {ourResultsText.moreResults[lang]}
            </ProtezButton>
          </TextAppearanceWrapper>
        )}
      </Section>
    </>
  )
})

OurResults.displayName = 'OurResults'
export default OurResults
