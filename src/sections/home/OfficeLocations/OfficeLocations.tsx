import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import Slider from 'react-slick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useRef } from 'react'
import ProtezImage from '@/components/ProtezImage'

const officeLocationsSection = {
  locations: [
    {
      country: {
        english: 'USA',
        ukrainian: 'USA',
      },
      location: {
        english: 'Oakdale',
        ukrainian: 'Oakdale',
      },
      address: {
        english: '3510 Hopkins Pl',
        ukrainian: '3510 Hopkins Pl',
      },
      img: 'officeLocationsSlide1.png',
    },
    {
      country: {
        english: 'Ukraine',
        ukrainian: 'Ukraine',
      },
      location: {
        english: 'Svalyava',
        ukrainian: 'Svalyava',
      },
      address: {
        english: 'Naberezhna St, 14, 61',
        ukrainian: 'вул. Набережна 14, 61',
      },
      img: 'officeLocationsSlide2.png',
    },
    {
      country: {
        english: 'Ukraine',
        ukrainian: 'Ukraine',
      },
      location: {
        english: 'Kyiv',
        ukrainian: 'Kyiv',
      },
      address: {
        english: 'Khreshchatyk St, 7/11',
        ukrainian: 'вул. Хрещатик 7/11',
      },
      img: 'officeLocationsSlide3.png',
    },
  ],
}

const OfficeLocations = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const sliderRef = useRef<Slider & React.Component>(null)
  const isDesktopLayout = width > 800

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
      {isDesktopLayout ? (
        <div className={style.cardsContainer}>
          {officeLocationsSection.locations.map((location, index) => (
            <div className={style.card} key={index}>
              <ProtezImage
                src={`protezPage/officeLocations/${location.img}`}
                alt={
                  location.country[lang] +
                  ', ' +
                  location.location[lang] +
                  ', ' +
                  location.address[lang]
                }
                className={style.image}
                width={488}
                height={520}
              />

              <Body large={isDesktopLayout} className={style.cardCountry}>
                {icons.locationIcon(style.locationIcon)}
                {location.country[lang]}
              </Body>
              <div className={style.text}>
                <H3 className={style.cardDate}>{location.location[lang]}</H3>
                <Body className={style.cardText}>{location.address[lang]}</Body>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
          {officeLocationsSection.locations.map((location, index) => (
            <div key={index}>
              <div className={style.cardWrapper}>
                <div className={style.card}>
                  <ProtezImage
                    src={`protezPage/officeLocations/${location.img}`}
                    alt={
                      location.country[lang] +
                      ', ' +
                      location.location[lang] +
                      ', ' +
                      location.address[lang]
                    }
                    className={style.image}
                    width={488}
                    height={520}
                  />

                  <Body large={isDesktopLayout} className={style.cardCountry}>
                    {icons.locationIcon(style.locationIcon)}
                    {location.country[lang]}
                  </Body>
                  <div className={style.text}>
                    <H3 className={style.cardDate}>{location.location[lang]}</H3>
                    <Body className={style.cardText}>{location.address[lang]}</Body>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </Section>
  )
}

export default OfficeLocations
