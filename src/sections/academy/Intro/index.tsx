import { forwardRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Button from '@/components/Button'

import Section from '@/components/Section'

import VideoAndFilter from '@/components/VideoAndFilter'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../../../app/academy/consts'
import ProtezImage from '@/components/ProtezImage'

const text = {
  academyDesc: {
    english:
      'Protez Academy is an educational project by the Protez Foundation in collaboration with Century College and contributions from specialists from University of Minnesota and Concordia University',
    ukrainian:
      'Академія Протез - це освітній проект Фонду Протез у співпраці з Коледжем Сентурі та за участю фахівців з Університету Міннесоти та Університету Конкордія',
  },
  applyToAcademy: {
    english: 'Apply to Academy',
    ukrainian: 'Подати заявку до Академії',
  },
  supportAcademy: {
    english: 'Support Academy',
    ukrainian: 'Підтримати Академію',
  },
}

const AcademyCard = ({
  image,
  width,
  height,
  className,
}: {
  image: string
  width: number
  height: number
  className?: string
}) => {
  return (
    <TextAppearanceWrapper className={`${style.academyCard} ${className}`}>
      <ProtezImage
        // TODO: remove after review
        src={image}
        object-fit="contain"
        alt={image as string}
        width={width}
        height={height}
        className={style.academyLogo}
      />
    </TextAppearanceWrapper>
  )
}

const AcademyIntro = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const { mobile, width } = useScreenModeAndSize()

  const isMobile = width < 768 || mobile

  return (
    <Section ref={ref} id={AcademyIDs.Intro} className={style.academyIntro}>
      <VideoAndFilter src={'academyPage/intro/introVideo.mp4'} />
      <div className={style.overlay} />
      <div className={style.academyContent}>
        <div className={style.leftPart}>
          <div className={style.sectionTitle}>{icons.academyIntroTitle()}</div>
          <p className={style.academyDesc}>{text.academyDesc[lang]}</p>
          <div className={style.buttonGroup}>
            <Button
              as="link"
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target={'_blank'}
              variant="primary-blue"
              size={isMobile ? 'big' : 'small'}
              rel="noopener noreferrer"
            >
              {text.applyToAcademy[lang]}
            </Button>
            <Button
              as="link"
              href="/donate"
              variant="secondary-white"
              size={isMobile ? 'big' : 'small'}
            >
              {text.supportAcademy[lang]}
              {icons.arrowUp(`${style.arrowUp}`)}
            </Button>
          </div>
        </div>
        <div className={style.rightPart}>
          <AcademyCard
            image="academyPage/intro/minnesotaUniversity.svg"
            width={isMobile ? 157 : 182}
            height={isMobile ? 28 : 33}
            className={style.academyCard}
          />
          <AcademyCard
            image="academyPage/intro/centuryCollege.svg"
            width={isMobile ? 43 : 64}
            height={isMobile ? 59 : 86}
            className={style.academyCard}
          />
          <AcademyCard
            image="academyPage/intro/concordiaUniversity.svg"
            width={isMobile ? 151 : 172}
            height={isMobile ? 37 : 42}
            className={style.academyCard}
          />
        </div>
      </div>
    </Section>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademyIntro.displayName = 'AcademyIntro'
}

export default AcademyIntro
