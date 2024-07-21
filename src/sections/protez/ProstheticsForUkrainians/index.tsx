import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body, H3 } from '@/components/Typography'
import { ProtezIDs } from '../consts'
import { MakeDonationButton, SupportWithAmazonButton } from '@/components/ProtezButton'

const prostheticsForUkrainiansText = {
  description1: {
    english:
      'We provide care for Ukrainians who have lost limbs and need prosthetics: from submitting an application through full rehabilitation.',
    ukrainian:
      'We provide care for Ukrainians who have lost limbs and need prosthetics: from submitting an application through full rehabilitation.',
  },
  description2: {
    english:
      'The goal of our work is to help ukrainian children, civilians and soldiers who have lost limbs as a result of the war receive high quality prosthetics in the US free of charge.',
    ukrainian:
      'The goal of our work is to help ukrainian children, civilians and soldiers who have lost limbs as a result of the war receive high quality prosthetics in the US free of charge.',
  },
  cards: {
    disabledPerson: {
      english: 'Our goal is to help people who have lost limbs to restore their quality of life',
      ukrainian: 'Our goal is to help people who have lost limbs to restore their quality of life',
    },

    helpHeart: {
      english: 'We provide mental health and emotional support during recovery.',
      ukrainian: 'We provide mental health and emotional support during recovery.',
    },

    people: {
      english: 'We bring people together to help support victims of war.',
      ukrainian: 'We bring people together to help support victims of war.',
    },

    hand: {
      english:
        'We provide state of the art prosthetics with personalized training and support in the US and follow-up care in Ukraine.',
      ukrainian:
        'We provide state of the art prosthetics with personalized training and support in the US and follow-up care in Ukraine.',
    },
  },
}

const ProstheticsForUkrainians = () => {
  const { lang } = useLanguage()

  return (
    <Section id={ProtezIDs.ProstheticsForUkrainians} className={style.section}>
      <div className={style.left}>
        {icons.prostheticsForUkrainiansLogo.desktop[lang](style.title)}
        <H3 className={style.description1}>{prostheticsForUkrainiansText.description1[lang]}</H3>
        <H3>{prostheticsForUkrainiansText.description2[lang]}</H3>
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <MakeDonationButton lang={lang} />
          <SupportWithAmazonButton lang={lang} color="white" />
        </TextAppearanceWrapper>
      </div>
      <div className={style.right}>
        <div className={style.leftCol}>
          <TextAppearanceWrapper className={style.card}>
            {icons.disabledPerson(style.icon)}
            <Body large>{prostheticsForUkrainiansText.cards.disabledPerson[lang]}</Body>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={style.card}>
            {icons.helpHeart(style.icon)}
            <Body large>{prostheticsForUkrainiansText.cards.helpHeart[lang]}</Body>
          </TextAppearanceWrapper>
        </div>
        <div className={style.rightCol}>
          <TextAppearanceWrapper className={style.card}>
            {icons.people(style.icon)}
            <Body large>{prostheticsForUkrainiansText.cards.people[lang]}</Body>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={style.card}>
            {icons.hand(style.icon)}
            <Body large>{prostheticsForUkrainiansText.cards.hand[lang]}</Body>
          </TextAppearanceWrapper>
        </div>
      </div>
    </Section>
  )
}

export default ProstheticsForUkrainians
