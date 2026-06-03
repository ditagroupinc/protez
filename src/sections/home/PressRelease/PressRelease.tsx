'use client'

import { useRef, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import style from './style.module.scss'
import Slider from '@/islands/SlickCarousel'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import ProtezImage from '@/components/ProtezImage'

type PressRelease = { title: string; text: string }

const releasesMeta = [
  { date: '12 December 2024', img: 'pressReleaseSlide2.png' },
  { date: '25 January 2025', img: 'pressReleaseSlide3.png' },
  { date: '2 July 2025', img: 'pressReleaseSlide5.png' },
  { date: '04 Aug 2025', img: 'pressReleaseSlide6.png' },
]

const PressRelease = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.pressRelease')
  const releases = t.raw('releases') as PressRelease[]

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)
  const wholeCardSliderRef = useRef<Slider & React.Component>(null)

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      gotoNext()
    }, 5000)

    return () => clearInterval(autoplayInterval)
  }, [])

  const gotoNext = () => {
    imageSliderRef.current?.slickNext()
    textSliderRef.current?.slickNext()
    wholeCardSliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    imageSliderRef.current?.slickPrev()
    textSliderRef.current?.slickPrev()
    wholeCardSliderRef.current?.slickPrev()
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,

    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,
          dots: true,
        },
      },
    ],
  }

  const orderedPressReleaseArray = releases
    .map((release, index) => ({ ...release, ...releasesMeta[index] }))
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      return dateB.getTime() - dateA.getTime()
    })

  return (
    <Section id={ProtezIDs.PressRelease} className={style.section}>
      <div className={`${style.card} ${style.desktopCard}`}>
        <TextAppearanceWrapper className={style.left}>
          <Slider ref={imageSliderRef} {...settings} className={style.imageSlider}>
            {orderedPressReleaseArray.map((slide, index) => (
              <div className={style.imageSlideWrapper} key={index}>
                <div className={style.imageSlide}>
                  <ProtezImage
                    src={`protezPage/pressRelease/${slide.img}`}
                    alt={slide.date + ' ' + slide.title}
                    className={style.image}
                    width={940}
                    height={660}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </TextAppearanceWrapper>

        <TextAppearanceWrapper className={style.right}>
          {icons.pressReleaseLogo.desktop[lang](style.pageTitle)}
          <Slider ref={textSliderRef} {...settings} className={style.textSlider}>
            {orderedPressReleaseArray.map((slide, index) => (
              <div className={style.textSlideWrapper} key={index}>
                <div className={style.textSlide}>
                  <Body large className={style.cardDate}>
                    {slide.date}
                  </Body>
                </div>
                <H3 className={style.cardTitle}>{slide.title}</H3>
                <Body className={style.cardText} large>
                  {slide.text}
                </Body>
              </div>
            ))}
          </Slider>
          <div className={style.sliderNavigation}>
            <button className={style.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(style.arrow)}
            </button>
            <button className={style.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(style.arrow)}
            </button>
          </div>
        </TextAppearanceWrapper>
      </div>
      <div className={style.mobileWrapper}>
        {icons.pressReleaseLogo.desktop[lang](style.pageTitle)}

        <Slider ref={wholeCardSliderRef} {...settings} className={style.wholeCardSlider}>
          {orderedPressReleaseArray.map((slide, index) => (
            <div key={index}>
              <div className={style.cardWrapper}>
                <div className={style.card}>
                  <TextAppearanceWrapper className={style.left}>
                    <div className={style.imageSlide}>
                      <ProtezImage
                        src={`protezPage/pressRelease/${slide.img}`}
                        alt={slide.date + ' ' + slide.title}
                        className={style.image}
                        width={940}
                        height={660}
                      />
                    </div>
                  </TextAppearanceWrapper>

                  <div className={style.right}>
                    <Body className={style.cardDate}>{slide.date}</Body>
                    <H3 className={style.cardTitle}>{slide.title}</H3>
                    <Body className={style.cardText}>{slide.text}</Body>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  )
}

export default PressRelease
