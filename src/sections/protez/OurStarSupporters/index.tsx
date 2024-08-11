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
import Link from 'next/link'

interface Supporter {
  text: {
    english: string
    ukrainian: string
  }
  name: {
    english: string
    ukrainian: string
  }
  description: {
    english: string
    ukrainian: string
  }
  instagramLink: string
  img: string
}

interface OurStarSupportersSection {
  supporters: Supporter[]
}

const ourStarSupportersSection: OurStarSupportersSection = {
  supporters: [
    {
      text: {
        english:
          '“Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. ”',
        ukrainian:
          '“Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. ”',
      },
      name: {
        english: 'Tina Karol',
        ukrainian: 'Tina Karol',
      },
      description: {
        english: 'Ukrainian singer',
        ukrainian: 'Ukrainian singer',
      },
      instagramLink: 'https://www.instagram.com/tina_karol/',
      img: 'ourStarSupportersSlide1.png',
    },
  ],
}

const OurStarSupporters = () => {
  const { lang } = useLanguage()

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    imageSliderRef.current?.slickNext()
    textSliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    imageSliderRef.current?.slickPrev()
    textSliderRef.current?.slickPrev()
  }

  const supportersArray: Supporter[] = Array(3).fill(ourStarSupportersSection.supporters[0])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Section id={ProtezIDs.OurStarSupporters} className={style.section}>
      <TextAppearanceWrapper>
        {icons.ourStarSupportersLogo.desktop[lang](style.pageTitle)}
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={style.sliderWrapper}>
        <button className={style.sliderButton} onClick={gotoPrev}>
          {icons.arrowLeft(style.arrow)}
        </button>
        <Slider ref={imageSliderRef} {...settings} className={style.slickSlider}>
          {supportersArray.map((slide, index) => (
            <div className={style.cardWrapper} key={index}>
              <div className={style.card}>
                <Image
                  // TODO: remove after review
                  src={`/protez/protezPage/ourStarSupporters/${slide.img}`}
                  alt={slide.name[lang] + ' ' + slide.description[lang]}
                  className={style.image}
                  width={260}
                  height={260}
                />

                <Body large className={style.cardText}>
                  {slide.text[lang]}
                </Body>
                <H3 className={style.cardName}> {slide.name[lang]}</H3>
                <Body className={style.cardDescription}> {slide.description[lang]}</Body>
                <Link target="_blank" className={style.instagramLink} href={slide.instagramLink}>
                  {icons.instagram(style.instagramIcon)}
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        <button className={style.sliderButton} onClick={gotoNext}>
          {icons.arrowRight(style.arrow)}
        </button>
      </TextAppearanceWrapper>
    </Section>
  )
}

export default OurStarSupporters
