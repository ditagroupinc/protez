import { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '../../../../app/consts'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

interface OurPatientsSection {
  patients: string[]
}

const ourPatientsSection: OurPatientsSection = {
  patients: ['ourPatientsSlide1.png', 'ourPatientsSlide2.png', 'ourPatientsSlide3.png'],
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

  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.15,

    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,

    rtl: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '50px',
          rtl: false,
        },
      },
    ],
  }

  const patientsArray: string[] = [...ourPatientsSection.patients, ...ourPatientsSection.patients]

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
      {/*  */}
      <div dir={isDesktopLayout ? 'rtl' : 'ltr'}>
        <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
          {patientsArray.map((slide, index) => (
            <div key={index}>
              <div className={style.cardWrapper}>
                <div className={style.card}>
                  <Image
                    // TODO: remove after review
                    src={`/protez/protezPage/ourPatients/${slide}`}
                    alt={'image of patients'}
                    className={style.image}
                    width={772}
                    height={500}
                  />
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
