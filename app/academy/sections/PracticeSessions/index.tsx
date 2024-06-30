import Image from 'next/image'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Section from '@/components/Section'

import style from './style.module.scss'
import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Slider from 'react-slick'

import { AcademyIDs } from '../../consts'

// TODO: remove after review

const practiceSessionsCards = [
  { image: 'academyPage/practiceSessions/practice0.png', text: 'Preparatory stage' },
  { image: 'academyPage/practiceSessions/practice1.png', text: 'Diagnostic (test) socket' },
  {
    image: 'academyPage/practiceSessions/practice2.png',
    text: 'Casting and measuring the prosthesis',
  },
  { image: 'academyPage/practiceSessions/practice0.png', text: 'Preparatory stage' },
  { image: 'academyPage/practiceSessions/practice1.png', text: 'Diagnostic (test) socket' },
  {
    image: 'academyPage/practiceSessions/practice2.png',
    text: 'Casting and measuring the prosthesis',
  },
]

const PracticeSessions = () => {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

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
    <Section id={AcademyIDs.PracticeSessions} className={style.practiceSessions}>
      {icons.practiceSessionsLogo.desktop[lang](style.title)}

      <TextAppearanceWrapper className={style.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
          {practiceSessionsCards.map((card, index) => {
            let slideClass = ''

            switch (index) {
              case activeSlide:
                slideClass = style.leftSlide
                break
              case (activeSlide + 1) % practiceSessionsCards.length:
                slideClass = style.centerSlide
                break
              case (activeSlide + 2) % practiceSessionsCards.length:
                slideClass = style.rightSlide
                break
              default:
                slideClass = ''
            }

            return (
              <div key={index}>
                <div className={`${style.cardWrapper} ${slideClass}`}>
                  <div className={`${style.card} `}>
                    <Image
                      // TODO: remove after review
                      src={`/protez/${card.image}`}
                      alt="picture of practice sessions in Protez Academy"
                      width={490}
                      height={500}
                      className={style.image}
                    />
                    <p className={style.text}>{card.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
        {width > 600 && (
          <div className={style.sliderNavigation}>
            <button className={style.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(style.arrowLeft)}
            </button>
            <button className={style.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(style.arrowRight)}
            </button>
          </div>
        )}
      </TextAppearanceWrapper>
    </Section>
  )
}

export default PracticeSessions
