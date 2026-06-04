'use client'

import { forwardRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import Button from '@/components/AcademyButton'

import AcademySection from '@/components/AcademySection'

import VideoAndFilter from '@/components/VideoAndFilter'

import ProtezImage from '@/components/ProtezImage'

import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '@academy/consts'
import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '@academy/consts/links'
import Slider from '@/islands/SlickCarousel'

const sliderCards = [
  '4-front_white.svg',
  'beetroot_white.svg',
  'biznes_white.svg',
  'blatchfold_white.svg',
  'brain-robotics_white.png',
  'century-collage_white.svg',
  'cerebral_white.svg',
  'chalice-of-mercy_white.svg',
  'concordia_white.svg',
  'cozen_white.svg',
]

const Card = ({ image, className }: { image: string; className?: string }) => {
  return (
    <div className={className}>
      <ProtezImage
        src={`${image}`}
        alt={image as string}
        width={200}
        height={120}
        className={style.academyLogo}
      />
    </div>
  )
}

const AcademyIntro = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academy')
  const { desktop: introTitle } = useAcademyTitle('welcome')
  const [sliderReady, setSliderReady] = useState(false)

  useEffect(() => {
    setSliderReady(true)
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 50000,
    cssEase: 'linear',
    pauseOnHover: false,
    pauseOnFocus: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
        },
      },
    ],
  }

  return (
    <AcademySection ref={ref} id={AcademyIDs.Intro} className={style.academyIntro}>
      <VideoAndFilter src={'academyPage/intro/introVideo.mp4'} />
      <div className={style.overlay}></div>
      <div className={style.content}>
        <div className={style.leftPart}>
          <div className={style.title}>
            <ProtezImage {...introTitle} priority />
          </div>
          <p className={style.academyDesc}>{t('intro.description')}</p>
          <div className={style.buttonGroup}>
            <Button
              as="link"
              href={ACADEMY_APPLY_FORM_URL}
              target={'_blank'}
              variant="primary-blue"
              size="big"
              rel="noopener noreferrer"
            >
              {t('cta.apply')}
            </Button>

            <Button as="link" href={DONATE_URL} variant="secondary-white" size="big">
              {t('cta.support')}
              {icons.arrowUp(`${style.arrow}`)}
            </Button>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.titleContainer}>
            <span className={style.greyTitle}>{t('intro.sponsorsTitle')}</span>
          </div>
          <a href={`#${AcademyIDs.SpecialThanksToAllOurPartners}`} className={style.blackButton}>
            {t('intro.allSponsorsLink')}
            {icons.arrowDown(style.arrow)}
          </a>

          <Card image="academyPage/partners/white/direct-relief_white.svg" className={style.card} />
          <Card image="academyPage/partners/white/rotary_white.svg" className={style.card} />
        </div>
      </div>
      <div className={style.slider}>
        <div className={style.sliderTitleContainer}>
          <span className={style.greyTitle}>{t('intro.partnersTitle')}</span>
        </div>
        {sliderReady && (
          <Slider {...settings}>
            {sliderCards.map((card, index) => {
              return (
                <div key={index}>
                  <Card image={`academyPage/partners/white/${card}`} className={style.wideCard} />
                </div>
              )
            })}
          </Slider>
        )}
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademyIntro.displayName = 'AcademyIntro'
}

export default AcademyIntro
