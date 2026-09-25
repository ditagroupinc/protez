'use client'

import { useTranslations } from 'next-intl'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '@/consts'
import { Body } from '@/components/Typography'

import Slider from '@/islands/SlickCarousel'
import { useRef, useState } from 'react'
import ProtezImage from '@/components/ProtezImage'

type PartnershipsGovernmentSupportCard = {
  image: string
  description: string
  width: number
  height: number
}

const PartnershipsGovernmentSupport = () => {
  const t = useTranslations('home.partnershipsGovernmentSupport')
  const cards = t.raw('cards') as PartnershipsGovernmentSupportCard[]
  const [activeSlide, setActiveSlide] = useState(0)
  const imageSliderRef = useRef<Slider & React.Component>(null)
  const sliderRef = useRef<Slider & React.Component>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    adaptiveHeight: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: false,
    centerMode: false,

    arrows: false,

    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: true,

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

    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next)
      imageSliderRef.current?.slickGoTo(next)
    },
  }

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <Section id={ProtezIDs.PartnershipsGovernmentSupport} className={style.section}>
      <div className={style.container}>
        <div className={style.left}>
          <Slider
            {...settings}
            beforeChange={undefined}
            responsive={undefined}
            accessibility={false}
            ref={imageSliderRef}
            className={style.imageSlider}
          >
            {cards.map((card, index) => (
              <div className={style.imageWrapper} key={index}>
                <ProtezImage
                  width={card.width}
                  height={card.height}
                  src={`protezPage/partnershipsGovernmentSupport/${card.image}`}
                  alt={card.description}
                  className={style.image}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className={style.right}>
          <div className={style.titleContainer}>
            <h2 className={style.title}>{t('title')}</h2>
            <div className={`${style.sliderNavigation} ${style.sliderNavigationTop}`}>
              <button
                type="button"
                aria-label={t('previousSlide')}
                className={style.sliderButton}
                onClick={gotoPrev}
              >
                {icons.arrowLeft(style.arrow)}
              </button>
              <button
                type="button"
                aria-label={t('nextSlide')}
                className={style.sliderButton}
                onClick={gotoNext}
              >
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
                    <div className={style.description}>
                      <Body large className={style.textSlide}>
                        {card.description}
                      </Body>
                    </div>
                    <div className={`${style.cardWrapper} ${slideClass}`}>
                      <div className={`${style.card} `}>
                        <ProtezImage
                          width={card.width}
                          height={card.height}
                          src={`protezPage/partnershipsGovernmentSupport/${card.image}`}
                          alt={card.description}
                          className={style.image}
                        />
                        <div className={style.description}>
                          <Body large className={style.text}>
                            {card.description}
                          </Body>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
          <TextAppearanceWrapper className={style.buttonsContainer}>
            <div className={`${style.sliderNavigation} ${style.sliderNavigationBottom}`}>
              <button
                type="button"
                aria-label={t('previousSlide')}
                className={style.sliderButton}
                onClick={gotoPrev}
              >
                {icons.arrowLeft(style.arrow)}
              </button>
              <button
                type="button"
                aria-label={t('nextSlide')}
                className={style.sliderButton}
                onClick={gotoNext}
              >
                {icons.arrowRight(style.arrow)}
              </button>
            </div>
          </TextAppearanceWrapper>
        </div>
      </div>
    </Section>
  )
}

export default PartnershipsGovernmentSupport
