import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body, H3 } from '@/components/Typography'
import { ProtezIDs } from '../consts'
import { MakeDonationButton, SupportWithAmazonButton } from '@/components/ProtezButton'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const sampleProsthesesCostsText = {
  description: {
    english:
      'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
    ukrainian:
      'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
  },
  miscellaneous: {
    english: 'Miscellaneous',
    ukrainian: 'Miscellaneous',
  },

  prostheses: [
    {
      text: {
        english: 'Hand or Arm',
        ukrainian: 'Hand or Arm',
      },
      price: '$16K',
      icon: icons.handOrArm,
    },
    {
      text: {
        english: 'Above the knee',
        ukrainian: 'Above the knee',
      },
      price: '$9k-22K',
      icon: icons.aboveTheKnee,
    },
    {
      text: {
        english: 'Below Knee',
        ukrainian: 'Below Knee',
      },
      price: '$6K',
      icon: icons.belowKnee,
    },
    {
      text: {
        english: 'Liners&Socks',
        ukrainian: 'Liners&Socks',
      },
      price: '$1K',
      icon: icons.linersAndSocks,
    },
    {
      text: {
        english: 'Components',
        ukrainian: 'Components',
      },
      price: '$500',
      icon: icons.components,
    },
    {
      text: {
        english: 'Sport foot',
        ukrainian: 'Sport foot',
      },
      price: '$1,5K',
      icon: icons.sportFoot,
    },
  ],
}

const PriceCard = ({
  text,
  price,
  icon,
}: {
  text: string
  price: string
  icon: (className: string) => JSX.Element
}) => {
  return (
    <TextAppearanceWrapper className={style.priceCard}>
      <div className={style.priceCardTextBlock}>
        <div className={style.priceCardText}>{text}</div>
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

  return (
    <Section id={ProtezIDs.SampleProsthesesCosts} className={style.section}>
      <div className={style.left}>
        {icons.sampleProsthesesCostsLogo.desktop[lang](style.title)}
        <Body large={isDesktopLayout} className={style.description}>
          {sampleProsthesesCostsText.description[lang]}
        </Body>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} />
            <SupportWithAmazonButton lang={lang} color="white" />
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
              />
            ))}
          </div>
        </div>
        {icons.line(style.line)}
        {icons.body(style.body)}
      </div>
      {!isDesktopLayout && (
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <MakeDonationButton lang={lang} />
          <SupportWithAmazonButton lang={lang} color="white" />
        </TextAppearanceWrapper>
      )}
    </Section>
  )
}

export default SampleProsthesesCosts
