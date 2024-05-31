import Image from 'next/image'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import styles from './styles.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const newsCards = [
  {
    link: '/',
    photo: '/academyNews/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: '/academyNews/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: '/academyNews/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: '/academyNews/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: '/academyNews/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: '/academyNews/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: '/academyNews/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: '/academyNews/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: '/academyNews/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: '/academyNews/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
  {
    link: '/',
    photo: '/academyNews/academyNews0.png',
    date: '19.03.2023',
    address: '1plus1.ua',
    logo: '/academyNews/1plus1.svg',
    title: 'Oakdale foundation helps hurt Ukrainian soldiers walk again',
    text: 'Some plan to return and fight: “To protect our country and protect my family and live my life to its fullest.”',
  },
]

const WeAreInNews = () => {
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
          centerPadding: '40px',
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
    <AcademySection id="weAreInNews" className={styles.weAreInNews}>
      {width < 600
        ? icons.weAreInNewsLogo.mobile[lang](styles.title)
        : icons.weAreInNewsLogo.desktop[lang](styles.title)}

      <div className={styles.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
          {newsCards.map((card, index) => {
            // let slideClass = ''

            // switch (index) {
            //   case activeSlide:
            //     slideClass = styles.leftSlide
            //     break
            //   case (activeSlide + 2) % newsCards.length:
            //     slideClass = styles.centerSlide
            //     break
            //   default:
            //     slideClass = ''
            // }
            let slideClass = ''

            switch (index) {
              // case activeSlide:
              //   slideClass = styles.centerSlide
              //   break
              // case (activeSlide - 1 + newsCards.length) % newsCards.length:
              //   slideClass = styles.leftSlide
              //   break
              // case (activeSlide - 2 + newsCards.length) % newsCards.length:
              //   slideClass = styles.leftEdgeSlide
              //   break
              // case (activeSlide + 1) % newsCards.length:
              //   slideClass = styles.rightSlide
              //   break
              // case (activeSlide + 2) % newsCards.length:
              //   slideClass = styles.rightEdgeSlide
              //   break
              case (activeSlide + 1) % newsCards.length:
                slideClass = styles.centerSlide
                break
              case activeSlide:
                slideClass = styles.leftSlide
                break
              default:
                slideClass = ''
            }

            return (
              <div key={index}>
                <div className={`${styles.cardWrapper} ${slideClass}`}>
                  <a href={card.link} target="blank" className={styles.card}>
                    <Image
                      src={card.photo}
                      alt="news picture"
                      width={488}
                      height={520}
                      className={`${styles.cardPicture}`}
                    />
                    <TextAppearanceWrapper
                      disableAnimation={width < 600}
                      className={styles.cardDataBlock}
                    >
                      <div className={styles.cardDate}>
                        <span>{card.date}</span>|<span>{card.address}</span>
                      </div>

                      <Image
                        src={card.logo}
                        alt="news picture"
                        width={488}
                        height={520}
                        className={`${styles.cardLogo}`}
                      />

                      <h3 className={styles.cardTitle}>{card.title}</h3>

                      <p className={styles.cardText}>{card.text}</p>
                    </TextAppearanceWrapper>
                    {icons.arrow(styles.iconArrow)}
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
        {width > 600 && (
          <div className={styles.sliderNavigation}>
            <button className={styles.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(styles.arrowLeft)}
            </button>
            <button className={styles.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(styles.arrowRight)}
            </button>
          </div>
        )}
      </div>
    </AcademySection>
  )
}

export default WeAreInNews
