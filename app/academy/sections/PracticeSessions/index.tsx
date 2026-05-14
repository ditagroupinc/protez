import ProtezImage from '@/components/ProtezImage'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@academy/components/AcademySection'

import SliderNavigation, {
  SliderPrevButton,
  SliderNextButton,
} from '@academy/components/SliderNavigation'

import styles from './styles.module.scss'
import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import Slider from 'react-slick'

import { AcademyIDs } from '../../consts'

const practiceImages = [
  'academyPage/practiceSessions/practice0.png',
  'academyPage/practiceSessions/practice1.png',
  'academyPage/practiceSessions/practice2.png',
  'academyPage/practiceSessions/practice0.png',
  'academyPage/practiceSessions/practice1.png',
  'academyPage/practiceSessions/practice2.png',
]

const PracticeSessions = () => {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()
  const t = useAcademyTexts()

  const items = t.practiceSessions.items
  const cards = practiceImages.map((image, index) => ({
    image,
    text: items[index % items.length],
  }))

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,

    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: '10px',
          slidesToShow: 1,
          dots: true,
        },
      },
    ],

    beforeChange: (_current: number, next: number) => setActiveSlide(next),
  }
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <AcademySection id={AcademyIDs.PracticeSessions} className={styles.practiceSessions}>
      <TextAppearanceWrapper>
        {icons.practiceSessionsLogo.desktop[lang](styles.title)}
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
          {cards.map((card, index) => {
            let slideClass = ''

            switch (index) {
              case activeSlide:
                slideClass = styles.leftSlide
                break
              case (activeSlide + 1) % cards.length:
                slideClass = styles.centerSlide
                break
              case (activeSlide + 2) % cards.length:
                slideClass = styles.rightSlide
                break
              default:
                slideClass = ''
            }

            return (
              <div key={index}>
                <div className={`${styles.cardWrapper} ${slideClass}`}>
                  <div className={`${styles.card} `}>
                    <ProtezImage
                      src={`${card.image}`}
                      alt={t.practiceSessions.imageAlt}
                      width={490}
                      height={500}
                      className={styles.image}
                    />
                    <p className={styles.text}>{card.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
        {width > 600 && (
          <SliderNavigation className={styles.sliderNavigation}>
            <SliderPrevButton onClick={gotoPrev} />
            <SliderNextButton onClick={gotoNext} />
          </SliderNavigation>
        )}
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default PracticeSessions
