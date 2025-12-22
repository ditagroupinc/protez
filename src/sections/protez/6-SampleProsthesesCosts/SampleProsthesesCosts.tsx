import { useLanguage } from '@/contexts/LanguageContext'

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

const sampleProsthesesCostsText = {
  description: {
    english:
      'Prosthetics are expensive life-changing devices. With help of volunteers and partners we were able to reduce the cost significantly, lower the overhead down to barebone minimum. Our program overhead is only 8%.',
    ukrainian:
      'Протези - це дорогі життєво необхідні пристрої. Завдяки допомозі волонтерів та партнерів нам вдалося суттєво знизити їхню вартість і скоротити адміністративні витрати до мінімально можливого рівня. Адміністративні витрати нашої програми становлять лише 8%.',
  },
  miscellaneous: {
    english: 'Miscellaneous',
    ukrainian: 'Інші',
  },

  prostheses: [
    {
      text: {
        english: 'Hand or Arm',
        ukrainian: 'Кисть або Рука',
      },
      price: '$16K',
      icon: icons.handOrArm,
    },
    {
      text: {
        english: 'Above the knee',
        ukrainian: 'Вище коліна',
      },
      price: '$9k-22K',
      icon: icons.aboveTheKnee,
    },
    {
      text: {
        english: 'Below Knee',
        ukrainian: 'Нижче коліна',
      },
      price: '$6K',
      icon: icons.belowKnee,
    },
    {
      text: {
        english: 'Liners&Socks',
        ukrainian: 'Підкладки',
      },
      price: '$1K',
      icon: icons.linersAndSocks,
    },
    {
      text: {
        english: 'Components',
        ukrainian: 'Компоненти',
      },
      price: '$500',
      icon: icons.components,
    },
    {
      text: {
        english: 'Sport foot',
        ukrainian: 'Спорт foot',
      },
      price: '$1,5K',
      icon: icons.sportFoot,
    },
  ],
}

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

  return (
    <Section id={ProtezIDs.SampleProsthesesCosts} className={style.section}>
      <div className={style.left}>
        {icons.sampleProsthesesCostsLogo.desktop[lang](style.title)}
        <Body large={isDesktopLayout} className={style.description}>
          {sampleProsthesesCostsText.description[lang]}
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
            {sampleProsthesesCostsText.prostheses.slice(0, 3).map((prosthesis, index) => (
              <PriceCard
                key={index}
                text={prosthesis.text[lang]}
                price={prosthesis.price}
                icon={prosthesis.icon}
                setHovered={setHovered}
              />
            ))}
          </div>
          <H3 className={style.pricesDivider}>{sampleProsthesesCostsText.miscellaneous[lang]}</H3>
          <div className={`${style.pricesBlock} ${style.lowerBlock}`}>
            {sampleProsthesesCostsText.prostheses.slice(3, 6).map((prosthesis, index) => (
              <PriceCard
                key={index}
                text={prosthesis.text[lang]}
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
