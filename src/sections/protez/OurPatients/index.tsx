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
import { BilingualText } from '@/types'

interface Patient {
  date: BilingualText
  title: BilingualText
  img: string
}

interface OurPatientsSection {
  patients: Patient[]
}

const ourPatientsSection: OurPatientsSection = {
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
      img: 'ourPatientsSlide1.png',
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
      img: 'ourPatientsSlide2.png',
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
      img: 'ourPatientsSlide3.png',
    },
  ],
}

const OurPatients = () => {
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

  const patientsArray: Patient[] = [...ourPatientsSection.patients, ...ourPatientsSection.patients]

  return (
    <Section id={ProtezIDs.OurPatients} className={style.section}>
      <TextAppearanceWrapper className={style.heading}>
        {icons.ourPatientsLogo.desktop[lang](style.pageTitle)}
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
                  src={`/protez/protezPage/ourPatients/${slide.img}`}
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

export default OurPatients
