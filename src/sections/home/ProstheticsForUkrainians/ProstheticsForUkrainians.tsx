'use client'

import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body, H3 } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'

const cardIcons = [icons.disabledPerson, icons.helpHeart, icons.people, icons.hand]

const ProstheticsForUkrainians = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.prostheticsForUkrainians')
  const cardsText = t.raw('cards') as string[]

  const cards = cardsText.map((text, index) => ({ text, icon: cardIcons[index] }))

  return (
    <Section id={ProtezIDs.ProstheticsForUkrainians} className={style.section}>
      <div className={style.left}>
        {icons.prostheticsForUkrainiansLogo.desktop[lang](`${style.title} ${style.titleDesktop}`)}
        {icons.prostheticsForUkrainiansLogo.mobile[lang](`${style.title} ${style.titleMobile}`)}
        <H3 className={style.description1}>{t('description1')}</H3>
        <H3>{t('description2')}</H3>
        <TextAppearanceWrapper className={`${style.buttonsContainer} ${style.buttonsContainerTop}`}>
          <MakeDonationButton size="normal" />
          <SupportWithAmazonButton color="white" size="normal" />
        </TextAppearanceWrapper>
      </div>
      <div className={style.right}>
        <div className={style.mobileCardLayout}>
          {cards.map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              {card.icon(style.icon)}
              <Body className={style.largeOnDesktop}>{card.text}</Body>
            </TextAppearanceWrapper>
          ))}
        </div>
        <div className={style.leftCol}>
          {cards.slice(0, 2).map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              {card.icon(style.icon)}
              <Body className={style.largeOnDesktop}>{card.text}</Body>
            </TextAppearanceWrapper>
          ))}
        </div>
        <div className={style.rightCol}>
          {cards.slice(2, 4).map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              {card.icon(style.icon)}
              <Body className={style.largeOnDesktop}>{card.text}</Body>
            </TextAppearanceWrapper>
          ))}
        </div>
      </div>
      <TextAppearanceWrapper
        className={`${style.buttonsContainer} ${style.buttonsContainerBottom}`}
      >
        <MakeDonationButton className={style.button} size="normal" />
        <SupportWithAmazonButton color="white" className={style.button} size="normal" />
      </TextAppearanceWrapper>
    </Section>
  )
}

export default ProstheticsForUkrainians
