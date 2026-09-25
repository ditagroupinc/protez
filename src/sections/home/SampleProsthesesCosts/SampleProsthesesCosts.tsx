'use client'

import { useLocale, useTranslations } from 'next-intl'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body, H3 } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'
import { useState } from 'react'
import { playfairDisplayItalic } from '../../../../app/fonts'

const prosthesesMeta = [
  { hoverTarget: 'Hand or Arm', icon: icons.handOrArm },
  { hoverTarget: 'Above the knee', icon: icons.aboveTheKnee },
  { hoverTarget: 'Below Knee', icon: icons.belowKnee },
  { hoverTarget: '', icon: icons.linersAndSocks },
  { hoverTarget: '', icon: icons.components },
  { hoverTarget: 'Sport foot', icon: icons.sportFoot },
] as const

type HoverClasses = (typeof prosthesesMeta)[number]['hoverTarget']

const PriceCard = ({
  text,
  price,
  icon,
  hoverTarget,
  setHovered,
}: {
  text: string
  price: string
  icon: (className: string) => JSX.Element
  hoverTarget: HoverClasses
  setHovered: (isHovered: HoverClasses) => void
}) => {
  const handleMouseEnter = () => {
    setHovered(hoverTarget)
  }
  const handleMouseLeave = () => setHovered('')

  return (
    <TextAppearanceWrapper
      className={style.priceCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.priceCardTextBlock}>
        <div className={`${style.priceCardText} ${playfairDisplayItalic.className}`}>{text}</div>
        <div className={style.priceCardPrice}>{price}</div>
      </div>

      <div className={style.priceCardCircle}>{icon(style.priceCardIcon)}</div>
    </TextAppearanceWrapper>
  )
}

const SampleProsthesesCosts = () => {
  const locale = useLocale()
  const t = useTranslations('home.sampleProsthesesCosts')
  const titleLines =
    locale === 'uk'
      ? ['accentFirst', 'plain', 'accentSecond']
      : ['accentFirst', 'accentSecond', 'plain']
  const prosthesesText = t.raw('prostheses') as string[]
  const prices = t.raw('prices') as string[]
  const description = t.raw('description') as string[]

  const [hovered, setHovered] = useState<HoverClasses>('')

  const hoverClasses: {
    [key in HoverClasses]: string
  } = {
    'Hand or Arm': style.spcForearm,
    'Sport foot': style.spcLeg,
    'Below Knee': style.spcLeg,
    'Above the knee': `${style.spcLeg} ${style.spcTigh}`,
    '': '',
  }

  const prostheses = prosthesesText.map((text, index) => ({
    text,
    price: prices[index],
    icon: prosthesesMeta[index].icon,
    hoverTarget: prosthesesMeta[index].hoverTarget,
  }))

  return (
    <Section id={ProtezIDs.SampleProsthesesCosts} className={style.section}>
      <div className={style.left}>
        <h2 className={`${style.title} ${locale === 'uk' ? style.ukrainianTitle : ''}`}>
          {titleLines.map(line => (
            <span
              key={line}
              className={`${style.titleLine} ${line !== 'plain' ? `${style.titleAccent} ${playfairDisplayItalic.className}` : ''}`}
            >
              {t(`title.${line}`)}{' '}
            </span>
          ))}
        </h2>
        <div className={style.description}>
          {description.map(paragraph => (
            <Body key={paragraph}>{paragraph}</Body>
          ))}
        </div>
        <TextAppearanceWrapper className={`${style.buttonsContainer} ${style.buttonsContainerTop}`}>
          <MakeDonationButton size="normal" />
          <SupportWithAmazonButton color="white" size="normal" />
        </TextAppearanceWrapper>
      </div>
      <div className={style.right}>
        <div className={style.prices}>
          <div className={`${style.pricesBlock} ${style.upperBlock}`}>
            {prostheses.slice(0, 3).map((prosthesis, index) => (
              <PriceCard
                key={index}
                text={prosthesis.text}
                price={prosthesis.price}
                icon={prosthesis.icon}
                hoverTarget={prosthesis.hoverTarget}
                setHovered={setHovered}
              />
            ))}
          </div>
          <H3 className={style.pricesDivider}>{t('miscellaneous')}</H3>
          <div className={`${style.pricesBlock} ${style.lowerBlock}`}>
            {prostheses.slice(3, 6).map((prosthesis, index) => (
              <PriceCard
                key={index}
                text={prosthesis.text}
                price={prosthesis.price}
                icon={prosthesis.icon}
                hoverTarget={prosthesis.hoverTarget}
                setHovered={setHovered}
              />
            ))}
          </div>
        </div>
        {icons.line(style.line)}
        {icons.body(`${style.body} ${hoverClasses[hovered]}`)}
      </div>
      <TextAppearanceWrapper
        className={`${style.buttonsContainer} ${style.buttonsContainerBottom}`}
      >
        <MakeDonationButton size="normal" />
        <SupportWithAmazonButton color="white" size="normal" />
      </TextAppearanceWrapper>
    </Section>
  )
}

export default SampleProsthesesCosts
