'use client'

import ProtezImage from '@/components/ProtezImage'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import AcademySection from '@/components/AcademySection'

import SliderNavigation, { SliderPrevButton, SliderNextButton } from '@/components/SliderNavigation'

import styles from './styles.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Slider from '@/islands/SlickCarousel'

import { AcademyIDs } from '@academy/consts'

const AcademyStudents = () => {
  const t = useTranslations('academy.academyStudents')
  const { desktop: titleDesktop } = useAcademyTitle('academy-students')
  const academyStudentsCards = t.raw('cards') as string[]
  const [activeSlide, setActiveSlide] = useState(0)

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
      <TextAppearanceWrapper className={styles.title}>
        <ProtezImage {...titleDesktop} />
      </TextAppearanceWrapper>

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
                    <ProtezImage
                      src={`${card}`}
                      alt={t('imageAlt')}
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
        <SliderNavigation className={styles.sliderNavigation}>
          <SliderPrevButton onClick={gotoPrev} />
          <SliderNextButton onClick={gotoNext} />
        </SliderNavigation>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default AcademyStudents
