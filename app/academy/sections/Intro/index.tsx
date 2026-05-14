import { forwardRef, useEffect, useState } from 'react'

// import { useLanguage } from '@/contexts/LanguageContext'

// import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Button from '@academy/components/Button'

import AcademySection from '@academy/components/AcademySection'

import VideoAndFilter from '@/components/VideoAndFilter'

// import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import ProtezImage from '@/components/ProtezImage'

import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import Slider from 'react-slick'

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
  // 'direct-relief_white.svg',
  // 'dita-group_white.svg',
  // 'donorbox_white.svg',
  // 'esper_white.svg',
  // 'evangelical-church_white.svg',
  // 'exp_white.svg',
  // 'fabtech_white.svg',
  // 'fizychna-associasion_white.svg',
  // 'highlight-printing_white.svg',
  // 'humana-travel_white.svg',
  // 'klmb_white.svg',
  // 'kpi_white.svg',
  // 'mhp_white.svg',
  // 'minnesota_white.svg',
  // 'monarch_white.svg',
  // 'ossur_white.svg',
  // 'ottobock._white.svg',
  // 'paradize_white.svg',
  // 'proteor_white.svg',
  // 'rotary_white.svg',
  // 'school-of-medicine_white.svg',
  // 'shupika_white.svg',
  // 'slumberland_white.svg',
  // 'smak_white.svg',
  // 'st-constantin_white.svg',
  // 'st-maron_white.svg',
  // 'ticket-to-america_white.svg',
  // 'ua_white.svg',
  // 'ukrainian-habitat-fund_white.svg',
  // 'ukrsibbank_white.svg',
  // 'united-help-ukraine_white.svg',
  // 'xtremity_white.svg',
]

const Card = ({ image, className }: { image: string; className?: string }) => {
  return (
    <div className={className}>
      <ProtezImage
        src={`${image}`}
        object-fit="contain"
        alt={image as string}
        width={200}
        height={120}
        className={style.academyLogo}
      />
    </div>
  )
}

const AcademyIntro = forwardRef<HTMLDivElement>(function (_, ref) {
  // const { lang } = useLanguage()
  // const { mobile, width } = useScreenModeAndSize()
  const t = useAcademyTexts()
  const { desktop: introTitle } = useAcademyTitle('intro')
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

  // const isMobile = width < 768 || mobile

  return (
    <AcademySection ref={ref} id={AcademyIDs.Intro} className={style.academyIntro}>
      <VideoAndFilter src={'academyPage/intro/introVideo.mp4'} />
      <div className={style.overlay}></div>
      <div className={style.content}>
        <div className={style.leftPart}>
          <div className={style.sectionTitle}>
            <ProtezImage {...introTitle} priority />
          </div>
          <p className={style.academyDesc}>{t.intro.description}</p>
          <div className={style.buttonGroup}>
            <Button
              as="link"
              href="https://docs.google.com/forms/d/e/1FAIpQLSf_4yg5XXs1eBQtnQzXGX7HagkbzW7xfim9kAuTXnhEj6CK-A/viewform"
              target={'_blank'}
              variant="primary-blue"
              // size={isMobile ? 'big' : 'small'}
              size="big"
              rel="noopener noreferrer"
            >
              {t.intro.cta.register}
            </Button>

            <Button as="link" href="/donate" variant="secondary-white" size="big">
              {t.intro.cta.support}
              {icons.arrowUp(`${style.arrow}`)}
            </Button>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.titleContainer}>
            <span className={style.greyTitle}>{t.intro.sponsorsTitle}</span>
          </div>
          <a href={`#${AcademyIDs.SpecialThanksToAllOurPartners}`} className={style.blackButton}>
            {t.intro.allSponsorsLink}
            {icons.arrowDown(style.arrow)}
          </a>

          <Card image="academyPage/partners/white/rotary_white.svg" className={style.card} />
          <Card image="academyPage/partners/white/direct-relief_white.svg" className={style.card} />
        </div>
      </div>
      <div className={style.slider}>
        <div className={style.sliderTitleContainer}>
          <span className={style.greyTitle}>{t.intro.partnersTitle}</span>
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
