import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body, H3 } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const prostheticsForUkrainiansText = {
  description1: {
    english:
      'We provide care for Ukrainians who have lost limbs and need prosthetics: from submitting an application through full rehabilitation.',
    ukrainian: `Ми надаємо повний спектр підтримки українцям, які втратили кінцівки та мають потребу в протезуванні: від моменту подачі заявки до повного відновлення здоров'я.`,
  },
  description2: {
    english:
      'The goal of our work is to help ukrainian children, civilians and soldiers who have lost limbs as a result of the war receive high quality prosthetics in the US free of charge.',
    ukrainian: `Наша місія полягає в тому, щоб надати можливість українським дітям, цивільним та військовим безкоштовно отримати протези високої якості в США.`,
  },
  cards: [
    {
      text: {
        english: 'Our goal is to help people who have lost limbs to restore their quality of life',
        ukrainian: `Наша мета - допомогти відновити якість життя людям, які втратили кінцівки.`,
      },
      icon: icons.disabledPerson,
    },

    {
      text: {
        english: 'We provide mental health and emotional support during recovery.',
        ukrainian: `Ми надаємо психологічну та емоційну підтримку під час відновлення.`,
      },
      icon: icons.helpHeart,
    },

    {
      text: {
        english: 'We bring people together to help support victims of war.',
        ukrainian: `Ми об'єднуємо людей для допомоги жертвам війни.`,
      },
      icon: icons.people,
    },

    {
      text: {
        english:
          'We provide state of the art prosthetics with personalized training and support in the US and follow-up care in Ukraine.',
        ukrainian: `Ми надаємо передові протези в США, супроводжуючи це індивідуальною підготовкою та підтримкою, а також забезпечуємо послідовний догляд у Україні.`,
      },
      icon: icons.hand,
    },
  ],
}

const ProstheticsForUkrainians = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const isDesktopLayout = width > 1180
  const isMobileLayout = width < 800

  const title = isMobileLayout
    ? icons.prostheticsForUkrainiansLogo.mobile
    : icons.prostheticsForUkrainiansLogo.desktop

  return (
    <Section id={ProtezIDs.ProstheticsForUkrainians} className={style.section}>
      <div className={style.left}>
        {title[lang](style.title)}
        <H3 className={style.description1}>{prostheticsForUkrainiansText.description1[lang]}</H3>
        <H3>{prostheticsForUkrainiansText.description2[lang]}</H3>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} size="normal" />
            <SupportWithAmazonButton lang={lang} color="white" size="normal" />
          </TextAppearanceWrapper>
        )}
      </div>
      <div className={style.right}>
        {isMobileLayout ? (
          prostheticsForUkrainiansText.cards.map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              {card.icon(style.icon)}
              <Body large={isDesktopLayout}>{card.text[lang]}</Body>
            </TextAppearanceWrapper>
          ))
        ) : (
          <>
            <div className={style.leftCol}>
              {prostheticsForUkrainiansText.cards.slice(0, 2).map((card, index) => (
                <TextAppearanceWrapper className={style.card} key={index}>
                  {card.icon(style.icon)}
                  <Body large={isDesktopLayout}>{card.text[lang]}</Body>
                </TextAppearanceWrapper>
              ))}
            </div>
            <div className={style.rightCol}>
              {prostheticsForUkrainiansText.cards.slice(2, 4).map((card, index) => (
                <TextAppearanceWrapper className={style.card} key={index}>
                  {card.icon(style.icon)}
                  <Body large={isDesktopLayout}>{card.text[lang]}</Body>
                </TextAppearanceWrapper>
              ))}
            </div>
          </>
        )}
      </div>
      {!isDesktopLayout && (
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <MakeDonationButton lang={lang} className={style.button} size="normal" />
          <SupportWithAmazonButton
            lang={lang}
            color="white"
            className={style.button}
            size="normal"
          />
        </TextAppearanceWrapper>
      )}
    </Section>
  )
}

export default ProstheticsForUkrainians
