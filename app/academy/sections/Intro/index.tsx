import { forwardRef } from 'react'

// import { useLanguage } from '@/contexts/LanguageContext'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Button from '@/components/Button'

import AcademySection from '@/components/AcademySection'

import VideoAndFilter from '@/components/VideoAndFilter'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import Image from 'next/image'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'

// introVideo.mp4

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
      <Image
        // TODO: remove after review
        src={`/protez/${image}`}
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
  // const { lang } = useLanguage()
  const { mobile, width } = useScreenModeAndSize()

  const isMobile = width < 768 || mobile

  return (
    <AcademySection ref={ref} id={AcademyIDs.Intro} className={style.academyIntro}>
      <VideoAndFilter src={'academyPage/intro/introVideo.mp4'} />
      <div className={style.overlay}></div>
      <div className={style.academyContent}>
        <div className={style.leftPart}>
          <div className={style.sectionTitle}>{icons.academyIntroTitle()}</div>
          <p className={style.academyDesc}>
            Protez Academy is an educational project by the Protez Foundation in collaboration with
            Century College and contributions from specialists from University of Minnesota and
            Concordia University
          </p>
          <div className={style.buttonGroup}>
            <Button
              as="link"
              href="https://forms.gle/G41WPhY8HiXbvA667"
              target={'_blank'}
              variant="primary-blue"
              size={isMobile ? 'big' : 'small'}
              rel="noopener noreferrer"
            >
              Особливості взаємодії з пацієнтами з втратою зору та ампутаціями
            </Button>
            <Button
              as="link"
              href="https://forms.gle/USf9fVTEgfzmGkBW9"
              target={'_blank'}
              variant="primary-blue"
              size={isMobile ? 'big' : 'small'}
              rel="noopener noreferrer"
            >
              Терапевтичні вправи: сучасний підхід до побудови занять
            </Button>
            <Button
              as="link"
              href="/donate"
              variant="secondary-white"
              size={isMobile ? 'big' : 'small'}
            >
              Support Academy
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
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademyIntro.displayName = 'AcademyIntro'
}

export default AcademyIntro
