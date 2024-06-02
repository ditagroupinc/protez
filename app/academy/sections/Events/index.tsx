import Image from 'next/image'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import styles from './styles.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'
import { forwardRef } from 'react'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '../../consts'

type Event = {
  date: string
  title: string
  link: string
  photo: string
  location: string
  upcoming?: boolean
}

const eventsCards: Event[] = [
  {
    link: '/',
    photo: '/academyEvents/academyEvent0.png',
    date: '2025-02-01',
    title: 'Hommage national à Léon Gautier.',
    location: 'Washington',
  },
  {
    link: '/',
    photo: '/academyEvents/academyEvent0.png',
    date: '2025-06-21',
    title: 'Hommage national à Léon Gautier.',
    location: 'Washington',
  },
  {
    link: '/',
    photo: '/academyEvents/academyEvent0.png',
    date: '2025-06-21',
    title: 'Hommage national à Léon Gautier.',
    location: 'Washington',
  },
  {
    link: '/',
    photo: '/academyEvents/academyEvent0.png',
    date: '2021-02-01',
    title: 'Hommage national à Léon Gautier.',
    location: 'Washington',
  },
  {
    link: '/',
    photo: '/academyEvents/academyEvent0.png',
    date: '2021-12-03',
    title: 'Hommage national à Léon Gautier.',
    location: 'Washington',
  },
  {
    link: '/',
    photo: '/academyEvents/academyEvent0.png',
    date: '2021-12-03',
    title: 'Hommage national à Léon Gautier.',
    location: 'Washington',
  },
]

const modifyAndSortEvents = (events: Event[]): Event[] => {
  const now = new Date()

  events.forEach(event => {
    const eventDate = new Date(event.date)

    event.upcoming = eventDate > now
  })

  // events.sort((a, b) => {
  //   const dateA = new Date(a.date).getTime()
  //   const dateB = new Date(b.date).getTime()

  //   return dateA - dateB
  // })

  const upcomingEvents = events.filter(event => new Date(event.date) > now)
  const pastEvents = events.filter(event => new Date(event.date) <= now)

  // Sort each category by date
  const sortByDate = (a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime()

  upcomingEvents.sort(sortByDate)
  pastEvents.sort(sortByDate)

  // Concatenate the sorted arrays
  const sortedEvents = [...upcomingEvents, ...pastEvents]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')

    return `${day}/${month}`
  }

  const eventsWithAdjustedData = sortedEvents.map(event => {
    return { ...event, date: formatDate(event.date) }
  })

  return eventsWithAdjustedData
}

const sortedEvents = modifyAndSortEvents(eventsCards)

const Events = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

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
          centerMode: false,
        },
      },

      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          centerMode: false,
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

    beforeChange: (_current: number, next: number) => setActiveSlide(next),
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
      <Image
        src="/events-background-Ukraine.png"
        alt="Ukrainian flag"
        width={1920}
        height={1080}
        className={styles.backgroundImage}
      />
      <div className={styles.titleWrapper}>
        {width < 1024
          ? icons.eventsLogo.mobile[lang](styles.title)
          : icons.eventsLogo.desktop[lang](styles.title)}
      </div>

      <TextAppearanceWrapper className={styles.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
          {sortedEvents.map((card, index) => {
            let slideClass = ''

            if (index === (activeSlide + 2) % sortedEvents.length && width > 1500) {
              slideClass = styles.centerSlide
            } else if (index === activeSlide && width > 1024 && width < 1500) {
              slideClass = styles.centerSlide
            } else if (
              index === (activeSlide + 1) % sortedEvents.length &&
              width > 600 &&
              width < 1024
            ) {
              slideClass = styles.centerSlide
            } else if (index === activeSlide && width < 600) slideClass = styles.centerSlide

            return (
              <div key={index}>
                <div className={`${styles.cardWrapper} ${slideClass}`}>
                  <a href={card.link} target="blank" className={styles.card}>
                    <Image
                      src={card.photo}
                      alt="events picture"
                      width={340}
                      height={480}
                      className={styles.cardPicture}
                    />

                    <div className={styles.cardDataBlock}>
                      <div className={styles.cardDateAndStatus}>
                        {card.upcoming ? (
                          <span className={`${styles.cardStatus} ${styles.upcoming}`}>
                            Upcoming event
                          </span>
                        ) : (
                          <span className={`${styles.cardStatus} ${styles.past}`}>Past event</span>
                        )}

                        <span className={styles.cardDate}>{card.date}</span>
                      </div>

                      <h3 className={styles.cardTitle}>{card.title}</h3>

                      <div className={styles.locationWrapper}>
                        {icons.location(styles.locationIcon)}
                        <span className={styles.locationText}>{card.location}</span>
                        {width < 600 && (
                          <span className={styles.locationButton}>
                            {icons.arrowTop(styles.iconArrow)}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
        {width > 600 && (
          <>
            <button className={styles.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(styles.arrowLeft)}
            </button>
            <button className={styles.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(styles.arrowRight)}
            </button>
          </>
        )}
      </TextAppearanceWrapper>
    </AcademySection>
  )
})

export default Events
