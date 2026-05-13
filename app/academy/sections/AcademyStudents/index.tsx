import Image from 'next/image'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import SliderNavigation, { SliderPrevButton, SliderNextButton } from '@/components/SliderNavigation'

import styles from './styles.module.scss'
import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Slider from 'react-slick'

import { AcademyIDs } from '../../consts'

// TODO: remove after review
const academyStudentsCards = [
  'academyPage/students/studentCard0.png',
  'academyPage/students/studentCard1.png',
  'academyPage/students/studentCard2.png',
  'academyPage/students/studentCard3.png',
  'academyPage/students/studentCard4.png',
  'academyPage/students/studentCard5.png',
  'academyPage/students/studentCard6.png',
]

const AcademyStudents = () => {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 4,
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
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          centerPadding: '20px',
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
    <AcademySection id={AcademyIDs.AcademyStudents} className={styles.academyStudents}>
      {icons.academyStudentsLogo.desktop[lang](styles.title)}

      <TextAppearanceWrapper className={styles.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
          {academyStudentsCards.map((card, index) => {
            let slideClass = ''

            switch (index) {
              case activeSlide:
                slideClass = styles.leftSlide
                break
              case (activeSlide + 2) % academyStudentsCards.length:
                slideClass = styles.centerSlide
                break
              default:
                slideClass = ''
            }

            return (
              <div key={index}>
                <div className={`${styles.cardWrapper} ${slideClass}`}>
                  <div className={`${styles.card} `}>
                    <Image
                      // TODO: remove after review
                      src={`/protez/${card}`}
                      alt="photo of students of Protez Academy"
                      width={490}
                      height={500}
                      className={styles.image}
                    />
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

export default AcademyStudents
