import { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import { BilingualText } from '@/types'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

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
      date: '12 December 2024',
      title: {
        ukrainian: 'Протезно-реабілітаційний центр на базі МВС: важлива ініціатива для військових',
        english:
          'Prosthetic and Rehabilitation Center based on the Ministry of Internal Affairs: an important initiative for military personnel',
      },
      text: {
        ukrainian:
          '12 грудня, у МВС України відбулася зустріч Міністра внутрішніх справ Ігоря Клименка разом з генеральним директором Protez Foundation Юрієм Арошидзе та президентом Direct Relief Томасом Тайге. У зустрічі також взяла участь заступниця Міністра внутрішніх справ України Катерина Павліченко. Головною темою перемовин стало питання створення протезно-реабілітаційного центру на базі одного з медичних закладів МВС.',
        english:
          'On December 12, a meeting was held at the Ministry of Internal Affairs of Ukraine with the Minister of Internal Affairs Ihor Klymenko, the General Director of the Protez Foundation Yurii Aroshidze, and the President of Direct Relief Thomas Tighe. The meeting was also attended by Deputy Minister of Internal Affairs of Ukraine Kateryna Pavlichenko. The main topic of negotiations was the creation of a prosthetic and rehabilitation center based on one of the medical institutions of the Ministry of Internal Affairs.',
      },

      img: 'pressReleaseSlide2.png',
    },
    {
      date: '25 January 2025',
      title: {
        ukrainian: 'Навчання команди Protez Foundation у США',
        english: 'Training of the Protez Foundation team in the USA',
      },
      text: {
        ukrainian: `Українська команда Protez Foundation успішно завершила своє двотижневе перебування в США! 🇺🇸 Цей період став чудовою нагодою для профільного навчання, а також для обговорення тем, що сприяють професійному зростанню та зміцненню єдності команди. Орієнтованість на навчання та побудова атмосфери взаємопідтримки є ключовими цінностями Protez Foundation.`,
        english: `The Ukrainian team of the Protez Foundation has successfully completed its two-week stay in the USA! 🇺🇸`,
      },

      img: 'pressReleaseSlide3.png',
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
              {pressReleaseSection.releases.map((slide, index) => (
                <div className={style.imageSlideWrapper} key={index}>
                  <div className={style.imageSlide}>
                    <ProtezImage
                      src={`protezPage/pressRelease/${slide.img}`}
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
              {pressReleaseSection.releases.map((slide, index) => (
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
            {pressReleaseSection.releases.map((slide, index) => (
              <div key={index}>
                <div className={style.cardWrapper}>
                  <div className={style.card}>
                    <TextAppearanceWrapper className={style.left}>
                      <div className={style.imageSlide}>
                        <ProtezImage
                          src={`protezPage/pressRelease/${slide.img}`}
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
