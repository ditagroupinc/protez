'use client'

import ProtezImage from '@/components/ProtezImage'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import AcademySection from '@/components/AcademySection'

import SliderNavigation, { SliderPrevButton, SliderNextButton } from '@/components/SliderNavigation'

import styles from './styles.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import Slider from '@/islands/SlickCarousel'

import { AcademyAboutIDs } from '@academy/about/consts'

type WeTrainItem = { image: string; text: string }

const WeTrain = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const t = useTranslations('academyAbout.weTrain')
  const items = t.raw('items') as WeTrainItem[]
  const { desktop: titleDesktop } = useAcademyTitle('we-train')

  const cards = [...items, ...items]

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
    <AcademySection id={AcademyAboutIDs.WeTrain} className={styles.practiceSessions}>
      <TextAppearanceWrapper>
        <ProtezImage {...titleDesktop} className={styles.title} />
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
                      alt={t('imageAlt')}
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
        <SliderNavigation className={styles.sliderNavigation}>
          <SliderPrevButton onClick={gotoPrev} />
          <SliderNextButton onClick={gotoNext} />
        </SliderNavigation>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default WeTrain
