import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '../consts'
import { H3 } from '@/components/Typography'
import ProtezButton from '@/components/ProtezButton'
import Slider from 'react-slick'
import Image from 'next/image'
import { useRef } from 'react'

const peopleTrustUsText = {
  description: {
    english:
      'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
    ukrainian:
      'Lorem ipsum dolor sit amet consectetur. Sit morbi convallis massa elit nec cursus condimentum pellentesque in. Amet dictum odio orci magna posuere. Amet in sit commodo mauris. Enim purus ut integer ultrices faucibus nunc diam consequat vitae. Consequat turpis et ',
  },
  latestNews: {
    english: 'Latest news',
    ukrainian: 'Latest news',
  },
}

const cards = ['peopleTrustUsSlide1.png', 'peopleTrustUsSlide2.png', 'peopleTrustUsSlide3.png']

const PeopleTrustUs = () => {
  const { lang } = useLanguage()

  const settings = {
    dots: false,
    infinite: true,
    // speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

    swipeToSlide: true,
    arrows: false,
  }
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <Section id={ProtezIDs.OurResults} className={style.section}>
      <div className={style.left}>
        <Slider {...settings} ref={sliderRef}>
          {cards.map((card, index) => (
            <div className={style.cardWrapper} key={index}>
              <Image
                width={984}
                height={540}
                src={`/protez/protezPage/peopleTrustUs/${card}`}
                alt={card}
                className={style.image}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className={style.right}>
        {icons.peopleTrustUsLogo.desktop[lang](style.title)}
        <H3>{peopleTrustUsText.description[lang]}</H3>
        <TextAppearanceWrapper className={style.buttonsContainer}>
          <div className={style.sliderNavigation}>
            <button className={style.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(style.arrow)}
            </button>
            <button className={style.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(style.arrow)}
            </button>
          </div>

          <ProtezButton as="link" href="/" variant="secondary-white" arrow>
            {peopleTrustUsText.latestNews[lang]}
          </ProtezButton>
        </TextAppearanceWrapper>
      </div>
    </Section>
  )
}

export default PeopleTrustUs
