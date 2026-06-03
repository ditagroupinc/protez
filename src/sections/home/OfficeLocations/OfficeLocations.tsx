'use client'

import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import Slider from '@/islands/SlickCarousel'
import { useRef } from 'react'
import ProtezImage from '@/components/ProtezImage'

type OfficeLocation = { country: string; location: string; address: string }

const locationImages = [
  'officeLocationsSlide1.png',
  'officeLocationsSlide2.png',
  'officeLocationsSlide3.png',
]

const OfficeLocations = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.officeLocations')
  const locationsRaw = t.raw('locations') as OfficeLocation[]
  const sliderRef = useRef<Slider & React.Component>(null)

  const locations = locationsRaw.map((location, index) => ({
    ...location,
    img: locationImages[index],
  }))

  const settings = {
    infinite: true,
    speed: 500,

    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,

    slidesToShow: 1,
    centerMode: true,
    centerPadding: '80px',
    dots: true,

    responsive: [
      {
        breakpoint: 500,
        settings: {
          centerPadding: '50px',
        },
      },
    ],
  }

  return (
    <Section id={ProtezIDs.OfficeLocations} className={style.section}>
      {icons.ukraineMap(style.ukraineMap)}
      <TextAppearanceWrapper className={style.heading}>
        {icons.officeLocationsLogo.desktop[lang](style.pageTitle)}
      </TextAppearanceWrapper>
      <div className={style.cardsContainer}>
        {locations.map((location, index) => (
          <div className={style.card} key={index}>
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
        ))}
      </div>
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

                <Body className={style.cardCountry}>
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
    </Section>
  )
}

export default OfficeLocations
