import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import CountUp from 'react-countup'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '../consts'
import { Body, H2 } from '@/components/Typography'
import ProtezButton, { MakeDonationButton } from '@/components/ProtezButton'
import VideoAndFilter from '@/components/VideoAndFilter'

const ourResultsText = {
  date: {
    english: 'May 2022 – September 2023',
    ukrainian: 'May 2022 – September 2023',
  },
  description: {
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

const OurResults = () => {
  const { lang } = useLanguage()

  return (
    <Section id={ProtezIDs.OurResults} className={style.section}>
      <div className={style.videoBlock}>
        {/* protez/ */}
        <VideoAndFilter src={'our-results.mov'} />
        <div className={style.overlay} />
      </div>

      <div className={style.left}>
        {icons.ourResultsLogo.desktop[lang](style.title)}
        <Body large className={style.date}>
          {ourResultsText.date[lang]}
        </Body>

        <Body large className={style.description}>
          {ourResultsText.description[lang]}
        </Body>

        <TextAppearanceWrapper className={style.buttonsContainer}>
          <MakeDonationButton lang={lang} />
          <ProtezButton as="link" href="/" variant="secondary-white" arrow>
            {ourResultsText.moreResults[lang]}
          </ProtezButton>
        </TextAppearanceWrapper>
      </div>
      <div className={style.right}>
        {ourResultsText.cards.map((card, index) => (
          <TextAppearanceWrapper key={index} className={style.card}>
            <div className={style.count}>
              {card.prefix && <span>{card.prefix}</span>}
              <CountUp end={card.number} duration={2} className={style.count} />
              {card.suffix && <span>{card.suffix}</span>}
            </div>
            <H2>{card.description}</H2>
          </TextAppearanceWrapper>
        ))}
      </div>
    </Section>
  )
}

export default OurResults
