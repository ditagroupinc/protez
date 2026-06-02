'use client'

import ProtezImage from '@/components/ProtezImage'

import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import AcademySection from '@/components/AcademySection'

import SliderNavigation, { SliderPrevButton, SliderNextButton } from '@/components/SliderNavigation'

import styles from './styles.module.scss'

import Slider from '@/islands/SlickCarousel'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '@academy/consts'

const Academy = () => {
  const t = useTranslations('academy.academyGallery')
  const { desktop: titleDesktop } = useAcademyTitle('protez-academy')
  const academyCards = t.raw('cards') as string[]
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
      }, 100)
    }

    handleInitialRender()

    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const debouncedUpdateNavPosition = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateNavPosition, 500)
    }

    window.addEventListener('resize', debouncedUpdateNavPosition)

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedUpdateNavPosition)
    }
  }, [])

  return (
    <AcademySection id={AcademyIDs.Academy} className={styles.academy}>
      <TextAppearanceWrapper>
        <ProtezImage {...titleDesktop} className={styles.title} />
      </TextAppearanceWrapper>
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
                      {card.includes('.mp4') ? (
                        <video
                          src={`/${card}`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={styles.video}
                        />
                      ) : (
                        <ProtezImage
                          src={`${card}`}
                          alt={t('imageAlt')}
                          width={720}
                          height={520}
                          className={styles.image}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
          {width > 600 && (
            <SliderNavigation ref={navRef} className={styles.sliderNavigation}>
              <SliderPrevButton onClick={gotoPrev} />
              <SliderNextButton onClick={gotoNext} />
            </SliderNavigation>
          )}
        </div>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default Academy
