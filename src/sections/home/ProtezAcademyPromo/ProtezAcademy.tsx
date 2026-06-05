'use client'

import { useTranslations } from 'next-intl'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import Button from '@/components/Button'
import ProtezImage from '@/components/ProtezImage'

const cards = ['ottobock_white.svg', 'minnesota_white.svg', 'xtremity_white.svg']

const Card = ({ image }: { image: string }) => {
  return (
    <TextAppearanceWrapper className={style.card}>
      <ProtezImage
        src={`partners/white/${image}`}
        alt={image as string}
        width={150}
        height={50}
        className={style.logo}
      />
    </TextAppearanceWrapper>
  )
}

const ProtezAcademy = () => {
  const t = useTranslations('home.protezAcademyPromo')

  return (
    <Section id={ProtezIDs.ProtezAcademy} className={style.section}>
      <div className={style.left}>
        <ProtezImage
          src={`protezPage/protezAcademy/protezAcademy.png`}
          alt="protezAcademy"
          width={760}
          height={748}
          className={style.image}
        />
      </div>
      <div className={style.right}>
        {icons.protezAcademyLogo(style.title)}
        <Body className={style.description}>{t('description')}</Body>
        <TextAppearanceWrapper className={`${style.buttonsContainer} ${style.buttonsContainerTop}`}>
          <Button as="link" href="/academy" variant="primary-blue" size="normal">
            {t('learnMore')}
          </Button>
          <Button
            as="link"
            target="_blank"
            href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
            variant="secondary-white"
            size="normal"
            arrow
          >
            {t('applyToAcademy')}
          </Button>
        </TextAppearanceWrapper>

        <TextAppearanceWrapper className={style.cardsWrapper}>
          {cards.map((card, index) => (
            <Card key={index} image={card} />
          ))}
        </TextAppearanceWrapper>
      </div>
      <TextAppearanceWrapper
        className={`${style.buttonsContainer} ${style.buttonsContainerBottom}`}
      >
        <Button as="link" href="/academy" variant="primary-blue" size="normal">
          {t('learnMore')}
        </Button>
        <Button as="link" href="/" variant="secondary-white" arrow size="normal">
          {t('applyToAcademy')}
        </Button>
      </TextAppearanceWrapper>
    </Section>
  )
}

export default ProtezAcademy
