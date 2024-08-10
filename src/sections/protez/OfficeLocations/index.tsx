import { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '../consts'
import { Body, H3 } from '@/components/Typography'

const officeLocationsSection = {
  patients: [
    {
      date: {
        english: 'March 2024',
        ukrainian: 'March 2024',
      },
      title: {
        english: '14th group of soldiers',
        ukrainian: '14th group of soldiers',
      },
      img: 'officeLocationsSlide1.png',
    },
    {
      date: {
        english: 'March 2024',
        ukrainian: 'March 2024',
      },
      title: {
        english: '14th group of soldiers',
        ukrainian: '14th group of soldiers',
      },
      img: 'officeLocationsSlide2.png',
    },
    {
      date: {
        english: 'March 2024',
        ukrainian: 'March 2024',
      },
      title: {
        english: '14th group of soldiers',
        ukrainian: '14th group of soldiers',
      },
      img: 'officeLocationsSlide3.png',
    },
  ],
}

const OfficeLocations = () => {
  const { lang } = useLanguage()

  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,

    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,

    rtl: true,
  }

  const patientsArray = [...officeLocationsSection.patients, ...officeLocationsSection.patients]

  return (
    <Section id={ProtezIDs.officeLocations} className={style.section}>
      <TextAppearanceWrapper className={style.heading}>
        {icons.officeLocationsLogo.desktop[lang](style.pageTitle)}
        <div className={style.sliderNavigation}>
          <button className={style.sliderButton} onClick={gotoPrev}>
            {icons.arrowLeft(style.arrow)}
          </button>
          <button className={style.sliderButton} onClick={gotoNext}>
            {icons.arrowRight(style.arrow)}
          </button>
        </div>
      </TextAppearanceWrapper>
      <div dir="rtl">
        <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
          {patientsArray.map((slide, index) => (
            <div className={style.cardWrapper} key={index}>
              <div className={style.card}>
                <Image
                  // TODO: remove after review
                  src={`/protez/protezPage/officeLocations/${slide.img}`}
                  alt={slide.date[lang] + ' ' + slide.title[lang]}
                  className={style.image}
                  width={772}
                  height={500}
                />
                <div className={style.text}>
                  <H3 className={style.cardDate}>{slide.title[lang]}</H3>
                  <Body className={style.cardText}>{slide.date[lang]}</Body>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  )
}

export default OfficeLocations
