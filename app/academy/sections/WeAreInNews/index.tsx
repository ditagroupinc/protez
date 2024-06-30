import Image from 'next/image'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Section from '@/components/Section'

import style from './style.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { forwardRef } from 'react'

import { AcademyIDs } from '../../consts'

// TODO: remove after review

const newsCards = [
  {
    link: '/',
    photo: 'academyPage/news/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: 'academyPage/news/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: 'academyPage/news/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: 'academyPage/news/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: 'academyPage/news/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: 'academyPage/news/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: 'academyPage/news/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: 'academyPage/news/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: 'academyPage/news/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: 'academyPage/news/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: 'academyPage/news/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: 'academyPage/news/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
]

const WeAreInNews = forwardRef<HTMLDivElement>(function (_, ref) {
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
    <Section ref={ref} id={AcademyIDs.WeAreInNews} className={style.weAreInNews}>
      {width < 600
        ? icons.weAreInNewsLogo.mobile[lang](style.title)
        : icons.weAreInNewsLogo.desktop[lang](style.title)}

      <div className={style.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
          {newsCards.map((card, index) => {
            let slideClass = ''

            switch (index) {
              case (activeSlide + 1) % newsCards.length:
                slideClass = style.centerSlide
                break
              case activeSlide:
                slideClass = style.leftSlide
                break
              default:
                slideClass = ''
            }

            return (
              <div key={index}>
                <div className={`${style.cardWrapper} ${slideClass}`}>
                  <a href={card.link} target="blank" className={style.card}>
                    <Image
                      // TODO: remove after review
                      src={`/protez/${card.photo}`}
                      alt="news picture"
                      width={488}
                      height={520}
                      className={`${style.cardPicture}`}
                    />
                    <TextAppearanceWrapper className={style.cardDataBlock}>
                      <div className={style.cardDate}>
                        <span>{card.date}</span>|<span>{card.address}</span>
                      </div>

                      <Image
                        // TODO: remove after review
                        src={`/protez/${card.logo}`}
                        alt="news picture"
                        width={488}
                        height={520}
                        className={`${style.cardLogo}`}
                      />

                      <h3 className={style.cardTitle}>{card.title}</h3>

                      <p className={style.cardText}>{card.text}</p>
                    </TextAppearanceWrapper>
                    {icons.arrow(style.iconArrow)}
                  </a>
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
      </div>
    </Section>
  )
})

export default WeAreInNews
