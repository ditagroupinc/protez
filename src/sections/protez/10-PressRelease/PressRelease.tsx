import { useRef, useEffect } from 'react'

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
          'On December 12, a meeting was held at the Ministry of Internal Affairs of Ukraine with the Minister of Internal Affairs Ihor Klymenko, the General Director of the Protez Foundation Yura Aroshidze, and the President of Direct Relief Thomas Tighe. The meeting was also attended by Deputy Minister of Internal Affairs of Ukraine Kateryna Pavlichenko. The main topic of negotiations was the creation of a prosthetic and rehabilitation center based on one of the medical institutions of the Ministry of Internal Affairs.',
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
    {
      date: '2 July 2025',
      title: {
        ukrainian: 'Закладення капсули часу для Центру МВС',
        english: 'Laying of the Time Capsule for the Ministry of Internal Affairs Center',
      },
      text: {
        ukrainian: `Міністр внутрішніх справ Ігор Клименко разом із президентом Protez Foundation Юрієм Арошидзе заклали капсулу часу у фундамент першого Центру протезування та ортезування МВС України.
        Нині об’єкт перебуває на стадії реконструкції. Після, у Центрі буде встановлено сучасне обладнання з найновішими технологіями. Простір стане територією підтримки, відновлення та гідності для захисників і захисниць з ампутаціями.`,
        english: `Minister of Internal Affairs Ihor Klymenko, together with Protez Foundation President Yura Aroshidze, laid a time capsule in the foundation of Ukraine’s first Ministry of Internal Affairs Prosthetics and Orthotics Center.
        The facility is currently under reconstruction. Once completed, it will be equipped with state-of-the-art technology. The Center will become a space of support, recovery, and dignity for defenders with amputations.`,
      },

      img: 'pressReleaseSlide5.png',
    },
    {
      date: '04 Aug 2025',
      title: {
        ukrainian: `«L.P.S: Україна–США»: 10 ліцеїстів МВС вирушили до США`,
        english: `“L.P.S: Ukraine–USA”: 10 lyceum students of the Ministry of Internal Affairs went to the USA`,
      },
      text: {
        ukrainian: `10 ліцеїстів МВС вирушили до США у рамках освітньої поїздки «L.P.S: Ukraine–USA».
        Це унікальна нагода для молодих українців ознайомитися з американською культурою, цінностями, системою безпеки та роботою поліції, рятувальників і військових. І водночас — гідно представити українську культуру, силу духу та патріотизм. 
        Поїздка організована у співпраці Protez Foundation та МВС України. Ми працювали над цим проєктом понад чотири місяці, щоб створити для ліцеїстів насичену та цінну програму.`,
        english: `10 lyceum students of the Ministry of Internal Affairs went to the USA as part of the educational trip “L.P.S: Ukraine-USA”.
        This is a unique opportunity for young Ukrainians to get acquainted with American culture, values, the security system and the work of the police, rescuers and military. And at the same time - to adequately present Ukrainian culture, strength of spirit and patriotism.
        The trip is organized in cooperation with the Prosthesis Foundation and the Ministry of Internal Affairs of Ukraine. We have been working on this project for more than four months to create a rich and valuable program for lyceum students.`,
      },
      img: 'pressReleaseSlide6.png',
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

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      gotoNext()
    }, 5000)

    return () => clearInterval(autoplayInterval)
  }, [isDesktopLayout])

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
    autoplay: false,
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

  const orderedPressReleaseArray = pressReleaseSection.releases.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return dateB.getTime() - dateA.getTime()
  })

  return (
    <Section id={ProtezIDs.PressRelease} className={style.section}>
      {isDesktopLayout ? (
        <div className={style.card}>
          <TextAppearanceWrapper className={style.left}>
            <Slider ref={imageSliderRef} {...settings} className={style.imageSlider}>
              {orderedPressReleaseArray.map((slide, index) => (
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
              {orderedPressReleaseArray.map((slide, index) => (
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
            {orderedPressReleaseArray.map((slide, index) => (
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
