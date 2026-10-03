'use client'

import { useRef, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { playfairDisplayItalic } from '../../../../app/fonts'

import style from './style.module.scss'
import Slider from '@/islands/SlickCarousel'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import SectionTitle from '@/components/SectionTitle'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import ProtezImage from '@/components/ProtezImage'

type PritezFoundationNews = { title: string; text: string }

const releasesMeta = [
  { date: '12 December 2024', img: 'pritezFoundationNewsSlide2.png' },
  { date: '25 January 2025', img: 'pritezFoundationNewsSlide3.png' },
  { date: '2 July 2025', img: 'pritezFoundationNewsSlide5.png' },
  { date: '04 Aug 2025', img: 'pritezFoundationNewsSlide6.png' },
  { date: '23 September 2026', img: 'yura-aroshidze-presidential-award.png' },
]

const PritezFoundationNews = () => {
  const locale = useLocale()
  const t = useTranslations('home.pritezFoundationNews')
  const titleLines =
    locale === 'uk' ? ['news', 'brand', 'foundation'] : ['brand', 'foundation', 'news']
  const title = (
    <SectionTitle className={style.title}>
      {titleLines.map(line => (
        <span
          key={line}
          className={`${style.titleLine} ${(locale === 'uk' ? line === 'news' : line !== 'news') ? `${style.titleAccent} ${playfairDisplayItalic.className}` : ''}`}
        >
          {t(`title.${line}`)}{' '}
        </span>
      ))}
    </SectionTitle>
  )
  const releases = t.raw('releases') as PritezFoundationNews[]

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)
  const wholeCardSliderRef = useRef<Slider & React.Component>(null)

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      const selection = window.getSelection()

      if (
        selection &&
        !selection.isCollapsed &&
        selection.anchorNode?.parentElement?.closest(`#${ProtezIDs.PritezFoundationNews}`)
      ) {
        return
      }

      gotoNext()
    }, 5000)

    return () => clearInterval(autoplayInterval)
  }, [])

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

    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
    responsive: [
      {
        breakpoint: 799,
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

  const sortedReleases = releases
    .map((release, index) => ({ ...release, ...releasesMeta[index] }))
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      return dateB.getTime() - dateA.getTime()
    })
  const featuredRelease = sortedReleases.find(
    release => release.img === 'yura-aroshidze-presidential-award.png'
  )
  const orderedProtezFoundationNewsArray = featuredRelease
    ? [featuredRelease, ...sortedReleases.filter(release => release !== featuredRelease)]
    : sortedReleases

  return (
    <Section id={ProtezIDs.PritezFoundationNews} className={style.section}>
      <div className={`${style.card} ${style.desktopCard}`}>
        <TextAppearanceWrapper className={style.left}>
          <Slider ref={imageSliderRef} {...settings} className={style.imageSlider}>
            {orderedProtezFoundationNewsArray.map((slide, index) => (
              <div className={style.imageSlideWrapper} key={index}>
                <div className={style.imageSlide}>
                  <ProtezImage
                    src={`protezPage/pritezFoundationNews/${slide.img}`}
                    alt={slide.date + ' ' + slide.title}
                    className={style.image}
                    width={940}
                    height={660}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </TextAppearanceWrapper>

        <TextAppearanceWrapper className={style.right}>
          {title}
          <Slider ref={textSliderRef} {...settings} className={style.textSlider}>
            {orderedProtezFoundationNewsArray.map((slide, index) => (
              <div className={style.textSlideWrapper} key={index}>
                <div className={style.textSlide}>
                  <Body large className={style.cardDate}>
                    {slide.date}
                  </Body>
                </div>
                <H3 className={style.cardTitle}>{slide.title}</H3>
                <Body className={style.cardText} large>
                  {slide.text}
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
      <div className={style.mobileWrapper}>
        {title}

        <Slider ref={wholeCardSliderRef} {...settings} className={style.wholeCardSlider}>
          {orderedProtezFoundationNewsArray.map((slide, index) => (
            <div key={index}>
              <div className={style.cardWrapper}>
                <div className={style.card}>
                  <TextAppearanceWrapper className={style.left}>
                    <div className={style.imageSlide}>
                      <ProtezImage
                        src={`protezPage/pritezFoundationNews/${slide.img}`}
                        alt={slide.date + ' ' + slide.title}
                        className={style.image}
                        width={940}
                        height={660}
                      />
                    </div>
                  </TextAppearanceWrapper>

                  <div className={style.right}>
                    <Body className={style.cardDate}>{slide.date}</Body>
                    <H3 className={style.cardTitle}>{slide.title}</H3>
                    <Body className={style.cardText}>{slide.text}</Body>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  )
}

export default PritezFoundationNews
