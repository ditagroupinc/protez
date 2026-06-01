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
  description1: {
    english:
      'Protez Academy is an educational project by the Protez Foundation in collaboration with Century College and contributions from specialists from University of Minnesota and Concordia University',
    ukrainian:
      'Protez Academy — це освітній проєкт Фонду Protez у співпраці з Century College та за участі спеціалістів з Університету Міннесоти та Університету Конкордія.',
  },
  description2: {
    english: `Реєстрація на тренінг з оволодіння практичними навичками
“Особливості взаємодії з військовими з втратою зору”.`,
    ukrainian: `Реєстрація на тренінг з оволодіння практичними навичками
“Особливості взаємодії з військовими з втратою зору”.`,
  },
  description3: {
    english: `Тут ви можете ознайомитися з офіційними документами, що
регламентують проведення тренінгу з оволодіння практичними навичками “Особливості взаємодії з військовими з втратою зору”. Вони містять ключові методології, положення та стандарти, які забезпечують якість, прозорість та академічну доброчесність заходу.`,
    ukrainian: `Тут ви можете ознайомитися з офіційними документами, що
регламентують проведення тренінгу з оволодіння практичними навичками “Особливості взаємодії з військовими з втратою зору”. Вони містять ключові методології, положення та стандарти, які забезпечують якість, прозорість та академічну доброчесність заходу.`,
  },
  register: {
    english: 'Реєстрація на тренінг з оволодіння практичними навичками',
    ukrainian: 'Реєстрація на тренінг з оволодіння практичними навичками',
  },
  documents: {
    english: 'Документи й регламенти',
    ukrainian: 'Документи й регламенти',
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
          <span>{protezAcademyText.description1[lang]}</span>
          <span>{protezAcademyText.description2[lang]}</span>
          <span>{protezAcademyText.description3[lang]}</span>
        </Body>
        {isDesktopLayout && (
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <Button as="link" href="/" variant="primary-blue" size="normal">
              {protezAcademyText.register[lang]}
            </Button>
            <Button
              as="button"
              onClick={downloadDocuments}
              variant="secondary-white"
              size="normal"
              arrow
            >
              {protezAcademyText.documents[lang]}
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
            {protezAcademyText.register[lang]}
          </Button>
          <Button
            as="button"
            onClick={downloadDocuments}
            variant="secondary-white"
            size="normal"
            arrow
          >
            {protezAcademyText.documents[lang]}
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
    </Section>
  )
}

export default ProtezAcademy
