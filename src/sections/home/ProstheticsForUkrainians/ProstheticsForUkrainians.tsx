import { useLanguage } from '@/contexts/LanguageContext'
import { useHomeTexts } from '@/hooks/useHomeTexts'

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
  const { lang } = useLanguage()
  const t = useHomeTexts().prostheticsForUkrainians
  const { width } = useScreenModeAndSize()

  const isDesktopLayout = width > 1180
  const isMobileLayout = width < 800

  const title = isMobileLayout
    ? icons.prostheticsForUkrainiansLogo.mobile
    : icons.prostheticsForUkrainiansLogo.desktop

  const cards = t.cards.map((text, index) => ({ text, icon: cardIcons[index] }))

  return (
    <Section id={ProtezIDs.ProstheticsForUkrainians} className={style.section}>
      <div className={style.left}>
        {title[lang](style.title)}
        <H3 className={style.description1}>{t.description1}</H3>
        <H3>{t.description2}</H3>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} size="normal" />
            <SupportWithAmazonButton lang={lang} color="white" size="normal" />
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
