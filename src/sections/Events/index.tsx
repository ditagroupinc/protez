import { useRef, useState } from 'react'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import style from './style.module.scss'

import EventsCard from './components/EventsCard'
import icons from './icons'
import Slider from 'react-slick'

import Image from 'next/image'
import { SingleEvent } from '@/utils/parsers'

function splitAndSortDates(events: SingleEvent[]) {
  const currentDate = new Date()
  const upcomingEvents = events
    .filter(event => new Date(event.endDate) >= currentDate)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())

  const previousEvents = events
    .filter(event => new Date(event.endDate) < currentDate)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())

  return {
    upcomingEvents,
    previousEvents,
    upcomingEventsIndex: previousEvents.length,
  }
}

const Events = ({ events }: { events: SingleEvent[] }) => {
  const [eventsData] = useState(() => splitAndSortDates(events))
  const { mobile } = useScreenModeAndSize()

  const sliderRef = useRef(null)

  const getDateText = (event: SingleEvent) => {
    const { startDate, endDate } = event

    if (startDate === endDate) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [year, month, day] = startDate.split('-')

      return `${month}/${day}`
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [startYear, startMonth, startDay] = startDate.split('-')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [endYear, endMonth, endDay] = endDate.split('-')

      return `${startMonth}/${startDay}-${endMonth}/${endDay}`
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    initialSlide: eventsData.upcomingEventsIndex + 1,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,

    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 2300,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section className={`${style.section} section`} id="events">
      <Image
        src="/events-background-Ukraine.png"
        alt="Ukrainian flag"
        width={4096}
        height={1150}
        className={style.UkrainianFlag}
      />
      {mobile
        ? icons.eventsLogo.mobile.english(`svgTextBlock ${style.logo}`)
        : icons.eventsLogo.desktop.english(`svgTextBlock ${style.logo}`)}

      <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
        {eventsData.previousEvents.map((event, index) => (
          <EventsCard
            key={index}
            link={event.link}
            photo={event.image}
            address={event.location}
            title={event.title}
            date={getDateText(event)}
            status={'past'}
          />
        ))}
        {eventsData.upcomingEvents.map((event, index) => (
          <EventsCard
            key={index}
            link={event.link}
            photo={event.image}
            address={event.location}
            title={event.title}
            date={getDateText(event)}
            status={'upcoming'}
          />
        ))}
      </Slider>
    </section>
  )
}

export default Events
