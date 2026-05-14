import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import Button from '@/components/Button'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

const protezAcademyText = {
  description: {
    english:
      'Protez Academy is an educational project by the Protez Foundation in collaboration with Century College and contributions from specialists from University of Minnesota and Concordia University',
    ukrainian:
      'Protez Academy — це освітній проєкт Фонду Protez у співпраці з Century College та за участі спеціалістів з Університету Міннесоти та Університету Конкордія.',
  },
  learnMore: {
    english: 'Learn more',
    ukrainian: 'Дізнатися більше',
  },
  applyToAcademy: {
    english: 'Apply to Academy',
    ukrainian: 'Доєднатися до Academy',
  },
}

const cards = ['ottobock.svg', 'minnesotaUniversity.svg', 'extremity.svg']

const Card = ({ image }: { image: string }) => {
  return (
    <TextAppearanceWrapper className={style.card}>
      <ProtezImage
        src={`protezPage/protezAcademy/${image}`}
        object-fit="contain"
        alt={image as string}
        width={150}
        height={50}
        className={style.logo}
      />
    </TextAppearanceWrapper>
  )
}

const ProtezAcademy = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  return (
    <Section id={ProtezIDs.ProtezAcademy} className={style.section}>
      <div className={style.left}>
        <ProtezImage
          src={`protezPage/protezAcademy/protezAcademy.png`}
          object-fit="contain"
          alt="protezAcademy"
          width={760}
          height={748}
          className={style.image}
        />
      </div>
      <div className={style.right}>
        {icons.protezAcademyLogo(style.title)}
        <Body large={isDesktopLayout} className={style.description}>
          {protezAcademyText.description[lang]}
        </Body>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <Button as="link" href="/" variant="primary-blue" size="normal">
              {protezAcademyText.learnMore[lang]}
            </Button>
            <Button
              as="link"
              target="_blank"
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              variant="secondary-white"
              size="normal"
              arrow
            >
              {protezAcademyText.applyToAcademy[lang]}
            </Button>
          </TextAppearanceWrapper>
        )}

        <TextAppearanceWrapper className={style.cardsWrapper}>
          {cards.map((card, index) => (
            <Card key={index} image={card} />
          ))}
        </TextAppearanceWrapper>
      </div>
      {!isDesktopLayout && (
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <Button as="link" href="/" variant="primary-blue" size="normal">
            {protezAcademyText.learnMore[lang]}
          </Button>
          <Button as="link" href="/" variant="secondary-white" arrow size="normal">
            {protezAcademyText.applyToAcademy[lang]}
          </Button>
        </TextAppearanceWrapper>
      )}
    </Section>
  )
}

export default ProtezAcademy
