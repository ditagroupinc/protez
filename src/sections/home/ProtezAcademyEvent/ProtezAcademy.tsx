import { useHomeTexts } from '@/hooks/useHomeTexts'

import Section from '@/components/Section'

import { icons } from './icons'
import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { Body } from '@/components/Typography'
import { ProtezIDs } from '@/consts'
import Button from '@/components/Button'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

const cards = ['ottobock.svg', 'minnesotaUniversity.svg', 'extremity.svg']

const Card = ({ image }: { image: string }) => {
  return (
    <TextAppearanceWrapper className={style.card}>
      <ProtezImage
        src={`protezPage/protezAcademy/${image}`}
        alt={image as string}
        width={150}
        height={50}
        className={style.logo}
      />
    </TextAppearanceWrapper>
  )
}

const ProtezAcademy = () => {
  const t = useHomeTexts().protezAcademyEvent
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  const downloadDocuments = () => {
    const documents = [
      'motedolohiia_ocin.pdf',
      'polozennya_pro_ocinku.pdf',
      'polozennya_pro_zapobihannia_konfliktam.pdf',
    ]

    documents.forEach(doc => {
      const link = document.createElement('a')

      link.href = `/protezPage/documents/${doc}`
      link.download = doc
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

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
        <Body large={isDesktopLayout} className={style.description}>
          <span>{t.description1}</span>
          <span>{t.description2}</span>
          <span>{t.description3}</span>
        </Body>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <Button as="link" href="/" variant="primary-blue" size="normal">
              {t.register}
            </Button>
            <Button
              as="button"
              onClick={downloadDocuments}
              variant="secondary-white"
              size="normal"
              arrow
            >
              {t.documents}
            </Button>
            <Button
              as="link"
              target="_blank"
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              variant="secondary-white"
              size="normal"
              arrow
            >
              {t.applyToAcademy}
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
            {t.register}
          </Button>
          <Button
            as="button"
            onClick={downloadDocuments}
            variant="secondary-white"
            size="normal"
            arrow
          >
            {t.documents}
          </Button>
          <Button
            as="link"
            target="_blank"
            href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
            variant="secondary-white"
            size="normal"
            arrow
          >
            {t.applyToAcademy}
          </Button>
        </TextAppearanceWrapper>
      )}
    </Section>
  )
}

export default ProtezAcademy
