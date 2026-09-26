'use client'

import { useMemo, useRef } from 'react'
import { useTranslations } from 'next-intl'

import { playfairDisplayItalic } from '../../../../app/fonts'

import Section from '@/components/Section'
import SectionTitle from '@/components/SectionTitle'

import style from './style.module.scss'
import { icons } from './icons'

import Slider from '@/islands/SlickCarousel'
import { forwardRef } from 'react'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { ProtezIDs } from '@/consts'
import ProtezImage from '@/components/ProtezImage'
import { modifyAndSortOurEvents, padOurEventsToMinimum } from './utils'
import { OurEventsProps } from './types'

const OurEvents = forwardRef<HTMLDivElement, OurEventsProps>(function ({ ourEvents }, ref) {
  const sortedOurEvents = useMemo(
    () => padOurEventsToMinimum(modifyAndSortOurEvents(ourEvents)),
    [ourEvents]
  )

  const t = useTranslations('home.ourEvents')

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',
    initialSlide: 0,

    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '53px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          centerPadding: '22px',
        },
      },
    ],
  }
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  if (sortedOurEvents.length === 0) return null

  return (
    <Section ref={ref} id={ProtezIDs.OurEvents} className={style.ourEvents}>
      <ProtezImage
        src="ourEvents-background-Ukraine.png"
        alt={t('alts.ukrainianFlag')}
        width={4096}
        height={1150}
        className={style.backgroundImage}
      />
      <div className={style.titleWrapper}>
        <SectionTitle className={style.title}>
          <span
            className={`${style.titleLine} ${style.titleAccent} ${playfairDisplayItalic.className}`}
          >
            {t('title.accent')}
          </span>{' '}
          <span className={style.titleLine}>{t('title.plain')}</span>
        </SectionTitle>
      </div>

      <TextAppearanceWrapper className={style.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
          {sortedOurEvents.map((card, index) => {
            const slideClass = ''

            return (
              <div key={index}>
                <div className={`${style.cardWrapper} ${slideClass}`}>
                  <a href={card.link} target="blank" className={style.card}>
                    <ProtezImage
                      src={card.photo}
                      alt={t('alts.ourEventsPicture')}
                      width={340}
                      height={480}
                      className={style.cardPicture}
                      external
                    />

                    <div className={style.cardDataBlock}>
                      <div className={style.cardDateAndStatus}>
                        {card.upcoming ? (
                          <span className={`${style.cardStatus} ${style.upcoming}`}>
                            {t('cardStatus.upcoming')}
                          </span>
                        ) : (
                          <span className={`${style.cardStatus} ${style.past}`}>
                            {t('cardStatus.past')}
                          </span>
                        )}

                        <span className={style.cardDate}>{card.date}</span>
                      </div>

                      <h3 className={style.cardTitle}>{card.title}</h3>

                      <div className={style.locationWrapper}>
                        {icons.location(style.locationIcon)}
                        <span className={style.locationText}>{card.location}</span>
                        <span className={style.locationButton}>
                          {icons.arrowTop(style.iconArrow)}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
        <button className={style.sliderButton} onClick={gotoPrev}>
          {icons.arrowLeft(style.arrowLeft)}
        </button>
        <button className={style.sliderButton} onClick={gotoNext}>
          {icons.arrowRight(style.arrowRight)}
        </button>
      </TextAppearanceWrapper>
    </Section>
  )
})

OurEvents.displayName = 'OurEvents'
export default OurEvents
