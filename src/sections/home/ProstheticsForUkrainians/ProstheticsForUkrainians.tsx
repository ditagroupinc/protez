'use client'

import { useLocale, useTranslations } from 'next-intl'

import { playfairDisplayItalic } from '../../../../app/fonts'

import Section from '@/components/Section'
import ProtezImage from '@/components/ProtezImage'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body, H3 } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'

const cardIcons = ['accessibility.svg', 'caring-hands.svg', 'community.svg', 'support-ukraine.svg']

const ProstheticsForUkrainians = () => {
  const locale = useLocale()
  const t = useTranslations('home.prostheticsForUkrainians')
  const cardsText = t.raw('cards') as string[]

  const cards = cardsText.map((text, index) => ({ text, icon: cardIcons[index] }))

  return (
    <Section id={ProtezIDs.ProstheticsForUkrainians} className={style.section}>
      <div className={style.left}>
        <h2 className={`${style.title} ${locale === 'uk' ? style.ukrainianTitle : ''}`}>
          <span className={style.titleLine}>
            {icons.ukrainianFlag(style.flag)}
            <span>{t('title.prosthetics')}</span>
          </span>{' '}
          <span className={style.titleLine}>
            <span className={`${style.titleAccent} ${playfairDisplayItalic.className}`}>
              {t('title.for')}
            </span>{' '}
            <span>{t('title.ukrainians')}</span>
          </span>
        </h2>
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
              <ProtezImage
                src={`icons/${card.icon}`}
                alt={card.icon}
                width={48}
                height={48}
                className={style.icon}
              />
              <Body className={style.largeOnDesktop}>{card.text}</Body>
            </TextAppearanceWrapper>
          ))}
        </div>
        <div className={style.leftCol}>
          {cards.slice(0, 2).map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              <ProtezImage
                src={`icons/${card.icon}`}
                alt={card.icon}
                width={48}
                height={48}
                className={style.icon}
              />
              <Body className={style.largeOnDesktop}>{card.text}</Body>
            </TextAppearanceWrapper>
          ))}
        </div>
        <div className={style.rightCol}>
          {cards.slice(2, 4).map((card, index) => (
            <TextAppearanceWrapper className={style.card} key={index}>
              <ProtezImage
                src={`icons/${card.icon}`}
                alt={card.icon}
                width={48}
                height={48}
                className={style.icon}
              />
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
