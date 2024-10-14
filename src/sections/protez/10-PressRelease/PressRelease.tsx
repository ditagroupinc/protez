import { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '../../../../app/consts'
import { Body, H3 } from '@/components/Typography'
import { BilingualText } from '@/types'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

interface Release {
  date: string
  title: BilingualText
  text: BilingualText
  img: string
}

interface PressReleaseSection {
  releases: Release[]
}

const pressReleaseSection: PressReleaseSection = {
  releases: [
    {
      date: '27.03.2023',
      title: {
        english: 'Head of Zakarpattia Region',
        ukrainian: 'Head of Zakarpattia Region',
      },
      text: {
        english:
          'The head of Zakarpattia Oblast, Viktor Mykyta, visited the Protez Foundation prosthesis clinic in the city of Svalyava. One of the goals is to improve prosthetics and rehabilitation for the military. We express our gratitude to the governor for his support and active position in supporting Ukrainian veterans.',
        ukrainian:
          'The head of Zakarpattia Oblast, Viktor Mykyta, visited the Protez Foundation prosthesis clinic in the city of Svalyava. One of the goals is to improve prosthetics and rehabilitation for the military. We express our gratitude to the governor for his support and active position in supporting Ukrainian veterans.',
      },

      img: 'pressReleaseSlide1.png',
    },
  ],
}

const PressRelease = () => {
  const { lang } = useLanguage()

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)
  const wholeCardSliderRef = useRef<Slider & React.Component>(null)

  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  const gotoNext = () => {
    imageSliderRef.current?.slickNext()
    textSliderRef.current?.slickNext()
    wholeCardSliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    imageSliderRef.current?.slickPrev()
    textSliderRef.current?.slickPrev()
    wholeCardSliderRef.current?.slickPrev()
  }

  const releasesArray: Release[] = Array(3).fill(pressReleaseSection.releases[0])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,

    // TODO: reuse for other sliders
    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,
          dots: true,
        },
      },
    ],
  }

  return (
    <Section id={ProtezIDs.PressRelease} className={style.section}>
      {isDesktopLayout ? (
        <div className={style.card}>
          <TextAppearanceWrapper className={style.left}>
            <Slider ref={imageSliderRef} {...settings} className={style.imageSlider}>
              {releasesArray.map((slide, index) => (
                <div className={style.imageSlideWrapper} key={index}>
                  <div className={style.imageSlide}>
                    <Image
                      // TODO: remove after review
                      src={`/protez/protezPage/pressRelease/${slide.img}`}
                      alt={slide.date + ' ' + slide.title[lang]}
                      className={style.image}
                      width={984}
                      height={640}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </TextAppearanceWrapper>

          <TextAppearanceWrapper className={style.right}>
            {icons.pressReleaseLogo.desktop[lang](style.pageTitle)}
            <Slider ref={textSliderRef} {...settings} className={style.textSlider}>
              {releasesArray.map((slide, index) => (
                <div className={style.textSlideWrapper} key={index}>
                  <div className={style.textSlide}>
                    <Body large={isDesktopLayout} className={style.cardDate}>
                      {slide.date}
                    </Body>
                  </div>
                  <H3 className={style.cardTitle}>{slide.title[lang]}</H3>
                  <Body className={style.cardText} large={isDesktopLayout}>
                    {slide.text[lang]}
                  </Body>
                </div>
              ))}
            </Slider>
            <div className={style.sliderNavigation}>
              <button className={style.sliderButton} onClick={gotoPrev}>
                {icons.arrowLeft(style.arrow)}
              </button>
              <button className={style.sliderButton} onClick={gotoNext}>
                {icons.arrowRight(style.arrow)}
              </button>
            </div>
          </TextAppearanceWrapper>
        </div>
      ) : (
        <>
          {icons.pressReleaseLogo.desktop[lang](style.pageTitle)}

          <Slider ref={wholeCardSliderRef} {...settings} className={style.wholeCardSlider}>
            {releasesArray.map((slide, index) => (
              <div key={index}>
                <div className={style.cardWrapper}>
                  <div className={style.card}>
                    <TextAppearanceWrapper className={style.left}>
                      <div className={style.imageSlide}>
                        <Image
                          // TODO: remove after review
                          src={`/protez/protezPage/pressRelease/${slide.img}`}
                          alt={slide.date + ' ' + slide.title[lang]}
                          className={style.image}
                          width={984}
                          height={640}
                        />
                      </div>
                    </TextAppearanceWrapper>

                    <div className={style.right}>
                      <Body large={isDesktopLayout} className={style.cardDate}>
                        {slide.date}
                      </Body>
                      <H3 className={style.cardTitle}>{slide.title[lang]}</H3>
                      <Body className={style.cardText} large={isDesktopLayout}>
                        {slide.text[lang]}
                      </Body>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
    </Section>
  )
}

export default PressRelease
