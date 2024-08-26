import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '../consts'
import { Body } from '@/components/Typography'
import ProtezButton from '@/components/ProtezButton'
import Slider from 'react-slick'
import Image from 'next/image'
import { useRef, useState } from 'react'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const peopleTrustUsText = {
  latestNews: {
    english: 'Latest news',
    ukrainian: 'Latest news',
  },
  cards: [
    {
      image: 'peopleTrustUsSlide1.png',
      description: {
        english:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
        ukrainian:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
      },
    },
    {
      image: 'peopleTrustUsSlide2.png',
      description: {
        english:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
        ukrainian:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
      },
    },
    {
      image: 'peopleTrustUsSlide3.png',
      description: {
        english:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
        ukrainian:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
      },
    },
    {
      image: 'peopleTrustUsSlide1.png',
      description: {
        english:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
        ukrainian:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
      },
    },
    {
      image: 'peopleTrustUsSlide2.png',
      description: {
        english:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
        ukrainian:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
      },
    },
    {
      image: 'peopleTrustUsSlide3.png',
      description: {
        english:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
        ukrainian:
          'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
      },
    },
  ],
}

const PeopleTrustUs = () => {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

    swipeToSlide: true,
    arrows: false,
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

  const showTopNavigation = width < 1180 && width > 800
  const isDesktop = width > 1180

  return (
    <Section id={ProtezIDs.OurResults} className={style.section}>
      <div className={style.container}>
        {isDesktop && (
          <div className={style.left}>
            <Slider {...settings} ref={imageSliderRef} className={style.imageSlider}>
              {peopleTrustUsText.cards.map((card, index) => (
                <div className={style.imageWrapper} key={index}>
                  <Image
                    width={984}
                    height={540}
                    src={`/protez/protezPage/peopleTrustUs/${card.image}`}
                    alt={card.description[lang]}
                    className={style.image}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className={style.right}>
          <div className={style.titleContainer}>
            {icons.peopleTrustUsLogo.desktop[lang](style.title)}
            {showTopNavigation && (
              <div className={style.sliderNavigation}>
                <button className={style.sliderButton} onClick={gotoPrev}>
                  {icons.arrowLeft(style.arrow)}
                </button>
                <button className={style.sliderButton} onClick={gotoNext}>
                  {icons.arrowRight(style.arrow)}
                </button>
              </div>
            )}
          </div>
          <div>
            <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
              {peopleTrustUsText.cards.map((card, index) => {
                let slideClass = ''

                switch (index) {
                  case activeSlide:
                    slideClass = style.leftSlide
                    break
                  case (activeSlide + 1) % peopleTrustUsText.cards.length:
                    slideClass = style.centerSlide
                    break
                  case (activeSlide + 2) % peopleTrustUsText.cards.length:
                    slideClass = style.rightSlide
                    break
                  default:
                    slideClass = ''
                }

                return (
                  <div key={index}>
                    <Body large className={style.textSlide}>
                      {card.description[lang]}
                    </Body>
                    <div className={`${style.cardWrapper} ${slideClass}`}>
                      <div className={`${style.card} `}>
                        <Image
                          width={984}
                          height={540}
                          src={`/protez/protezPage/peopleTrustUs/${card.image}`}
                          alt={card.description[lang]}
                          className={style.image}
                        />
                        <Body large={isDesktop} className={style.text}>
                          {card.description[lang]}
                        </Body>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
          <TextAppearanceWrapper className={style.buttonsContainer}>
            {!showTopNavigation && (
              <div className={style.sliderNavigation}>
                <button className={style.sliderButton} onClick={gotoPrev}>
                  {icons.arrowLeft(style.arrow)}
                </button>
                <button className={style.sliderButton} onClick={gotoNext}>
                  {icons.arrowRight(style.arrow)}
                </button>
              </div>
            )}

            <ProtezButton
              as="link"
              href="/"
              variant="secondary-white"
              arrow
              className={style.latestNewsButton}
            >
              {peopleTrustUsText.latestNews[lang]}
            </ProtezButton>
          </TextAppearanceWrapper>
        </div>
      </div>
    </Section>
  )
}

export default PeopleTrustUs
