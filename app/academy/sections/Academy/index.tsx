import Image from 'next/image'

import { useRef, useState, useEffect } from 'react'

import _ from 'lodash'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import style from './style.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '../../consts'

// TODO: remove after review
const academyCards = [
  'academyPage/academy/academyCard0.png',
  'academyPage/academy/academyCard1.png',
  'academyPage/academy/academyCard2video.mp4',
  'academyPage/academy/academyCard3.png',
  'academyPage/academy/academyCard4video.mp4',
  'academyPage/academy/academyCard5.png',
  'academyPage/academy/academyCard6.png',
]

const Academy = () => {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,

    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 1,
          centerPadding: '150px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
          dots: true,
          arrows: false,
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

  const navRef = useRef<HTMLDivElement>(null)

  const updateNavPosition = () => {
    const screenWidth = window.innerWidth

    if (screenWidth < 1024 && navRef.current) {
      navRef.current.style.left = 'initial'

      return
    }

    let selector = ''

    if (screenWidth < 1366) {
      selector = `.slick-slide .${style.rightSlide} img`
    } else {
      selector = `.slick-slide.slick-active .${style.rightSlide} img`
    }
    const rightSlideElement = document.querySelector(selector)

    if (rightSlideElement && navRef.current) {
      const rect = rightSlideElement.getBoundingClientRect()

      navRef.current.style.left = `${rect.left}px`
    }
  }

  useEffect(() => {
    const handleInitialRender = () => {
      updateNavPosition()
      setTimeout(() => {
        updateNavPosition()
      }, 100) // Delay for the first render
    }

    handleInitialRender()
    const debouncedUpdateNavPosition = _.debounce(updateNavPosition, 500)

    window.addEventListener('resize', debouncedUpdateNavPosition)

    return () => window.removeEventListener('resize', debouncedUpdateNavPosition)
  }, [])

  return (
    <AcademySection id={AcademyIDs.Academy} className={style.academy}>
      {icons.academyLogo.desktop[lang](style.title)}

      <TextAppearanceWrapper>
        <div className={style.sliderWrapper}>
          <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
            {academyCards.map((card, index) => {
              let slideClass = ''

              switch (index) {
                case (activeSlide - 1 + academyCards.length) % academyCards.length:
                  slideClass = style.leftSlide
                  break
                case (activeSlide - 2 + academyCards.length) % academyCards.length:
                  slideClass = style.leftEdgeSlide
                  break
                case (activeSlide + 1) % academyCards.length:
                  slideClass = style.rightSlide
                  break
                case (activeSlide + 2) % academyCards.length:
                  slideClass = style.rightEdgeSlide
                  break
                default:
                  slideClass = ''
              }

              return (
                <div key={index}>
                  <div className={`${style.cardWrapper} ${slideClass}`}>
                    <div className={`${style.card} `}>
                      {card.includes('.mp4') ? (
                        <video
                          src={`/protez/${card}`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={style.video}
                        />
                      ) : (
                        <Image
                          // TODO: remove after review
                          src={`/protez/${card}`}
                          alt="picture of Protez Academy students and teachers"
                          width={720}
                          height={520}
                          className={style.image}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
          {width > 600 && (
            <div className={style.sliderNavigation} ref={navRef}>
              <button className={style.sliderButton} onClick={gotoPrev}>
                {icons.arrowLeft(style.arrowLeft)}
              </button>
              <button className={style.sliderButton} onClick={gotoNext}>
                {icons.arrowRight(style.arrowRight)}
              </button>
            </div>
          )}
        </div>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default Academy
