import Image from 'next/image'

import { useRef, useState, useEffect } from 'react'

import _ from 'lodash'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import styles from './styles.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '../../consts'

// TODO: remove after review
const academyCards = [
  '/protez/academy/academyCard0.png',
  '/protez/academy/academyCard1.png',
  '/protez/academy/academyCard2.png',
  '/protez/academy/academyCard3.png',
  '/protez/academy/academyCard4.png',
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
      selector = `.slick-slide .${styles.rightSlide} img`
    } else {
      selector = `.slick-slide.slick-active .${styles.rightSlide} img`
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
    <AcademySection id={AcademyIDs.Academy} className={styles.academy}>
      {icons.academyLogo.desktop[lang](styles.title)}

      <TextAppearanceWrapper>
        <div className={styles.sliderWrapper}>
          <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
            {academyCards.map((card, index) => {
              let slideClass = ''

              switch (index) {
                case (activeSlide - 1 + academyCards.length) % academyCards.length:
                  slideClass = styles.leftSlide
                  break
                case (activeSlide - 2 + academyCards.length) % academyCards.length:
                  slideClass = styles.leftEdgeSlide
                  break
                case (activeSlide + 1) % academyCards.length:
                  slideClass = styles.rightSlide
                  break
                case (activeSlide + 2) % academyCards.length:
                  slideClass = styles.rightEdgeSlide
                  break
                default:
                  slideClass = ''
              }

              return (
                <div key={index}>
                  <div className={`${styles.cardWrapper} ${slideClass}`}>
                    <div className={`${styles.card} `}>
                      <Image
                        src={card}
                        alt="picture of Protez Academy students and teachers"
                        width={720}
                        height={520}
                        className={styles.image}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
          {width > 600 && (
            <div className={styles.sliderNavigation} ref={navRef}>
              <button className={styles.sliderButton} onClick={gotoPrev}>
                {icons.arrowLeft(styles.arrowLeft)}
              </button>
              <button className={styles.sliderButton} onClick={gotoNext}>
                {icons.arrowRight(styles.arrowRight)}
              </button>
            </div>
          )}
        </div>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default Academy
