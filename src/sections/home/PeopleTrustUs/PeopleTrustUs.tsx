'use client'

import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '@/consts'
import { Body } from '@/components/Typography'

import Slider from '@/islands/SlickCarousel'
import { useRef, useState } from 'react'
import ProtezImage from '@/components/ProtezImage'

type PeopleTrustUsCard = { image: string; description: string }

const PeopleTrustUs = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.peopleTrustUs')
  const cards = t.raw('cards') as PeopleTrustUsCard[]
  const [activeSlide, setActiveSlide] = useState(0)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

    arrows: false,

    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,

    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          centerMode: true,
          centerPadding: '80px',
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,

          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1,
          dots: true,
        },
      },
    ],

    beforeChange: (_current: number, next: number) => setActiveSlide(next),
  }

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    imageSliderRef.current?.slickNext()
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    imageSliderRef.current?.slickPrev()
    sliderRef.current?.slickPrev()
  }

  return (
    <Section id={ProtezIDs.PeopleTrustUs} className={style.section}>
      <div className={style.container}>
        <div className={style.left}>
          <Slider {...settings} ref={imageSliderRef} className={style.imageSlider}>
            {cards.map((card, index) => (
              <div className={style.imageWrapper} key={index}>
                <ProtezImage
                  width={940}
                  height={540}
                  src={`protezPage/peopleTrustUs/${card.image}`}
                  alt={card.description}
                  className={style.image}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className={style.right}>
          <div className={style.titleContainer}>
            {icons.peopleTrustUsLogo.desktop[lang](style.title)}
            <div className={`${style.sliderNavigation} ${style.sliderNavigationTop}`}>
              <button className={style.sliderButton} onClick={gotoPrev}>
                {icons.arrowLeft(style.arrow)}
              </button>
              <button className={style.sliderButton} onClick={gotoNext}>
                {icons.arrowRight(style.arrow)}
              </button>
            </div>
          </div>
          <div>
            <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
              {cards.map((card, index) => {
                let slideClass = ''

                switch (index) {
                  case activeSlide:
                    slideClass = style.leftSlide
                    break
                  case (activeSlide + 1) % cards.length:
                    slideClass = style.centerSlide
                    break
                  case (activeSlide + 2) % cards.length:
                    slideClass = style.rightSlide
                    break
                  default:
                    slideClass = ''
                }

                return (
                  <div key={index}>
                    <Body large className={style.textSlide}>
                      {card.description}
                    </Body>
                    <div className={`${style.cardWrapper} ${slideClass}`}>
                      <div className={`${style.card} `}>
                        <ProtezImage
                          width={940}
                          height={540}
                          src={`protezPage/peopleTrustUs/${card.image}`}
                          alt={card.description}
                          className={style.image}
                        />
                        <Body large className={style.text}>
                          {card.description}
                        </Body>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <div className={`${style.sliderNavigation} ${style.sliderNavigationBottom}`}>
              <button className={style.sliderButton} onClick={gotoPrev}>
                {icons.arrowLeft(style.arrow)}
              </button>
              <button className={style.sliderButton} onClick={gotoNext}>
                {icons.arrowRight(style.arrow)}
              </button>
            </div>
          </TextAppearanceWrapper>
        </div>
      </div>
    </Section>
  )
}

export default PeopleTrustUs
