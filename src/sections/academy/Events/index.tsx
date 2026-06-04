'use client'

import ProtezImage from '@/components/ProtezImage'

import { useRef, useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import AcademySection from '@/components/AcademySection'

import { SliderPrevButton, SliderNextButton } from '@/components/SliderNavigation'

import styles from './styles.module.scss'
import { icons } from './icons'

import Slider from '@/islands/SlickCarousel'
import { forwardRef } from 'react'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '@academy/consts'

type EventInput = {
  date: string
  title: string
  link: string
  photo: string
  location: string
}

type Event = EventInput & { upcoming: boolean }

const modifyAndSortEvents = (events: readonly EventInput[]): Event[] => {
  const now = new Date()

  const withUpcoming: Event[] = events.map(event => ({
    ...event,
    upcoming: new Date(event.date) > now,
  }))

  const sortByDate = (a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime()

  const upcomingEvents = withUpcoming.filter(event => event.upcoming).sort(sortByDate)
  const pastEvents = withUpcoming.filter(event => !event.upcoming).sort(sortByDate)

  const sortedEvents = [...upcomingEvents, ...pastEvents]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')

    return `${day}/${month}`
  }

  return sortedEvents.map(event => ({ ...event, date: formatDate(event.date) }))
}

const Events = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academy.events')
  const { desktop: titleDesktop } = useAcademyTitle('current-training-programs')

  const items = t.raw('items') as EventInput[]
  const sortedEvents = useMemo(() => modifyAndSortEvents(items), [items])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',

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
          centerMode: true,
          centerPadding: '0px',
        },
      },

      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          centerPadding: '40px',
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

  return (
    <AcademySection ref={ref} id={AcademyIDs.PastAndUpcomingEvents} className={styles.events}>
      <ProtezImage
        src="events-background-Ukraine.png"
        alt={t('backgroundAlt')}
        width={4096}
        height={1150}
        className={styles.backgroundImage}
      />
      <TextAppearanceWrapper className={styles.titleWrapper}>
        <ProtezImage {...titleDesktop} className={styles.title} />
      </TextAppearanceWrapper>

      <TextAppearanceWrapper className={styles.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
          {sortedEvents.map((card, index) => {
            return (
              <div key={index}>
                <div className={styles.cardWrapper}>
                  <a href={card.link} target="blank" className={styles.card}>
                    <ProtezImage
                      src={`${card.photo}`}
                      alt={t('imageAlt')}
                      width={340}
                      height={480}
                      className={styles.cardPicture}
                    />

                    <div className={styles.cardDataBlock}>
                      <div className={styles.cardDateAndStatus}>
                        {card.upcoming ? (
                          <span className={`${styles.cardStatus} ${styles.upcoming}`}>
                            {t('status.upcoming')}
                          </span>
                        ) : (
                          <span className={`${styles.cardStatus} ${styles.past}`}>
                            {t('status.past')}
                          </span>
                        )}

                        <span className={styles.cardDate}>{card.date}</span>
                      </div>

                      <h3 className={styles.cardTitle}>{card.title}</h3>

                      <div className={styles.locationWrapper}>
                        {icons.location(styles.locationIcon)}
                        <span className={styles.locationText}>{card.location}</span>
                        <span className={styles.locationButton}>
                          {icons.arrowTop(styles.iconArrow)}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
        <SliderPrevButton onClick={gotoPrev} className={styles.prevButton} />
        <SliderNextButton onClick={gotoNext} className={styles.nextButton} />
      </TextAppearanceWrapper>
    </AcademySection>
  )
})

Events.displayName = 'Events'
export default Events
