import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Image from 'next/image'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '../consts'
import { Body, H3 } from '@/components/Typography'

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
        english: '3510 Hopkins Pl',
        ukrainian: '3510 Hopkins Pl',
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
        english: 'Coming soon',
        ukrainian: 'Coming soon',
      },
      img: 'officeLocationsSlide3.png',
    },
  ],
}

const OfficeLocations = () => {
  const { lang } = useLanguage()

  return (
    <Section id={ProtezIDs.OfficeLocations} className={style.section}>
      <TextAppearanceWrapper className={style.heading}>
        {icons.officeLocationsLogo.desktop[lang](style.pageTitle)}
      </TextAppearanceWrapper>
      <div className={style.cardsContainer}>
        {officeLocationsSection.locations.map((location, index) => (
          <div className={style.card} key={index}>
            <Image
              // TODO: remove after review
              src={`/protez/protezPage/officeLocations/${location.img}`}
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

            <Body large className={style.cardCountry}>
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
    </Section>
  )
}

export default OfficeLocations
