import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body } from '@/components/Typography'
import { ProtezIDs } from '../consts'
import ProtezButton from '@/components/ProtezButton'
import Image from 'next/image'

const protezAcademyText = {
  description: {
    english:
      'Protez Academy is an educational project by the Protez Foundation in collaboration with Century College and contributions from specialists from University of Minnesota and Concordia University',
    ukrainian:
      'Protez Academy is an educational project by the Protez Foundation in collaboration with Century College and contributions from specialists from University of Minnesota and Concordia University',
  },
  learnMore: {
    english: 'Learn more',
    ukrainian: 'Learn more',
  },
  applyToAcademy: {
    english: 'Apply to Academy',
    ukrainian: 'Apply to Academy',
  },
}

const cards = ['ottobock.svg', 'minnesotaUniversity.svg', 'extremity.svg']

const Card = ({ image }: { image: string }) => {
  return (
    <TextAppearanceWrapper className={style.card}>
      <Image
        // TODO: remove after review
        src={`/protez/protezPage/protezAcademy/${image}`}
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

  return (
    <Section id={ProtezIDs.ProtezAcademy} className={style.section}>
      <div className={style.left}>
        <Image
          // TODO: remove after review
          src={`/protez/protezPage/protezAcademy/protezAcademy.png`}
          object-fit="contain"
          alt="protezAcademy"
          width={760}
          height={748}
          className={style.image}
        />
      </div>
      <div className={style.right}>
        {icons.protezAcademyLogo(style.title)}
        <Body large className={style.description}>
          {protezAcademyText.description[lang]}
        </Body>
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <ProtezButton as="link" href="/" variant="primary-blue">
            {protezAcademyText.learnMore[lang]}
          </ProtezButton>
          <ProtezButton as="link" href="/" variant="secondary-white" arrow>
            {protezAcademyText.applyToAcademy[lang]}
          </ProtezButton>
        </TextAppearanceWrapper>

        <TextAppearanceWrapper className={style.cardsWrapper}>
          {cards.map((card, index) => (
            <Card key={index} image={card} />
          ))}
        </TextAppearanceWrapper>
      </div>
    </Section>
  )
}

export default ProtezAcademy
