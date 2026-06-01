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
import { useState } from 'react'
import { playfairDisplayItalic } from '../../../../app/fonts'

const prosthesesMeta = [
  { price: '≈ $3,5К', icon: icons.handOrArm },
  { price: '≈ $20К', icon: icons.aboveTheKnee },
  { price: '$6K', icon: icons.belowKnee },
  { price: '> $600', icon: icons.linersAndSocks },
  { price: '> $500', icon: icons.components },
  { price: '≈ $3,5К', icon: icons.sportFoot },
]

const elementsToHover = ['Hand or Arm', 'Sport foot', 'Below Knee', 'Above the knee']

type HoverClasses = (typeof elementsToHover)[number] | ''

const PriceCard = ({
  text,
  price,
  icon,
  setHovered,
}: {
  text: string
  price: string
  icon: (className: string) => JSX.Element
  setHovered: (isHovered: HoverClasses) => void
}) => {
  const handleMouseEnter = () => {
    if (elementsToHover.find(textToHover => textToHover === text)) {
      setHovered(text)
    }
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
  const { lang } = useLanguage()
  const t = useHomeTexts().sampleProsthesesCosts
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

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

  const prostheses = t.prostheses.map((text, index) => ({
    text,
    price: prosthesesMeta[index].price,
    icon: prosthesesMeta[index].icon,
  }))

  return (
    <Section id={ProtezIDs.SampleProsthesesCosts} className={style.section}>
      <div className={style.left}>
        {icons.sampleProsthesesCostsLogo.desktop[lang](style.title)}
        <Body large={isDesktopLayout} className={style.description}>
          {t.description}
        </Body>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} size="normal" />
            <SupportWithAmazonButton lang={lang} color="white" size="normal" />
          </TextAppearanceWrapper>
        )}
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
                setHovered={setHovered}
              />
            ))}
          </div>
          <H3 className={style.pricesDivider}>{t.miscellaneous}</H3>
          <div className={`${style.pricesBlock} ${style.lowerBlock}`}>
            {prostheses.slice(3, 6).map((prosthesis, index) => (
              <PriceCard
                key={index}
                text={prosthesis.text}
                price={prosthesis.price}
                icon={prosthesis.icon}
                setHovered={setHovered}
              />
            ))}
          </div>
        </div>
        {icons.line(style.line)}
        {icons.body(`${style.body} ${hoverClasses[hovered]}`)}
      </div>
      {!isDesktopLayout && (
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <MakeDonationButton lang={lang} size="normal" />
          <SupportWithAmazonButton lang={lang} color="white" size="normal" />
        </TextAppearanceWrapper>
      )}
    </Section>
  )
}

export default SampleProsthesesCosts
