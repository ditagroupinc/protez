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
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const cardIcons = [icons.disabledPerson, icons.helpHeart, icons.people, icons.hand]

const ProstheticsForUkrainians = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.prostheticsForUkrainians')
  const cardsText = t.raw('cards') as string[]
  const { width } = useScreenModeAndSize()

  const isDesktopLayout = width > 1180
  const isMobileLayout = width < 800

  const title = isMobileLayout
    ? icons.prostheticsForUkrainiansLogo.mobile
    : icons.prostheticsForUkrainiansLogo.desktop

  const cards = cardsText.map((text, index) => ({ text, icon: cardIcons[index] }))

  return (
    <Section id={ProtezIDs.ProstheticsForUkrainians} className={style.section}>
      <div className={style.left}>
        {title[lang](style.title)}
        <H3 className={style.description1}>{t('description1')}</H3>
        <H3>{t('description2')}</H3>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton size="normal" />
            <SupportWithAmazonButton color="white" size="normal" />
          </TextAppearanceWrapper>
        )}
      </div>
      <div className={style.right}>
        {isMobileLayout ? (
          cards.map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              {card.icon(style.icon)}
              <Body large={isDesktopLayout}>{card.text}</Body>
            </TextAppearanceWrapper>
          ))
        ) : (
          <>
            <div className={style.leftCol}>
              {cards.slice(0, 2).map((card, index) => (
                <TextAppearanceWrapper className={style.card} key={index}>
                  {card.icon(style.icon)}
                  <Body large={isDesktopLayout}>{card.text}</Body>
                </TextAppearanceWrapper>
              ))}
            </div>
            <div className={style.rightCol}>
              {cards.slice(2, 4).map((card, index) => (
                <TextAppearanceWrapper className={style.card} key={index}>
                  {card.icon(style.icon)}
                  <Body large={isDesktopLayout}>{card.text}</Body>
                </TextAppearanceWrapper>
              ))}
            </div>
          </>
        )}
      </div>
      {!isDesktopLayout && (
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <MakeDonationButton className={style.button} size="normal" />
          <SupportWithAmazonButton color="white" className={style.button} size="normal" />
        </TextAppearanceWrapper>
      )}
    </Section>
  )
}

export default ProstheticsForUkrainians
