'use client'

import { useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import Slider from '@/islands/SlickCarousel'
import ProtezImage from '@/components/ProtezImage'

type OfficeLocation = { country: string; location: string; address: string }

const locationImages = [
  'officeLocationsSlide1.png',
  'officeLocationsSlide2.png',
  'officeLocationsSlide3.png',
  'officeLocationsSlide4.png',
  'officeLocationsSlide5.png',
  'officeLocationsSlide6.png',
]

const OfficeLocations = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.officeLocations')
  const locationsRaw = t.raw('locations') as OfficeLocation[]
  const sliderRef = useRef<Slider & React.Component>(null)

  const locations = locationsRaw.map((location, index) => ({
    ...location,
    img: locationImages[index] ?? locationImages[index % locationImages.length],
  }))

  const gotoPrev = () => sliderRef.current?.slickPrev()
  const gotoNext = () => sliderRef.current?.slickNext()

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1180, settings: { slidesToShow: 2 } },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: '80px', dots: true },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: '50px' },
      },
    ],
  }

  return (
    <Section id={ProtezIDs.OfficeLocations} className={style.section}>
      <ProtezImage
        src="protezPage/officeLocations/ukraine_map.svg"
        alt="map of the Ukraine"
        className={style.ukraineMap}
        width={708}
        height={873}
      />
      <TextAppearanceWrapper className={style.heading}>
        {icons.officeLocationsLogo.desktop[lang](style.title)}
      </TextAppearanceWrapper>

      <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
        {locations.map((location, index) => (
          <div key={index}>
            <div className={style.cardWrapper}>
              <div className={style.card}>
                <ProtezImage
                  src={`protezPage/officeLocations/${location.img}`}
                  alt={location.country + ', ' + location.location + ', ' + location.address}
                  className={style.image}
                  width={488}
                  height={520}
                />

                <Body large className={style.cardCountry}>
                  {icons.locationIcon(style.locationIcon)}
                  {location.country}
                </Body>
                <div className={style.text}>
                  <H3 className={style.cardDate}>{location.location}</H3>
                  <Body className={style.cardText}>{location.address}</Body>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className={style.sliderNavigation}>
        <button
          type="button"
          className={style.sliderButton}
          onClick={gotoPrev}
          aria-label="Previous slide"
        >
          {icons.arrowLeft(style.arrow)}
        </button>
        <button
          type="button"
          className={style.sliderButton}
          onClick={gotoNext}
          aria-label="Next slide"
        >
          {icons.arrowRight(style.arrow)}
        </button>
      </div>
    </Section>
  )
}

export default OfficeLocations
