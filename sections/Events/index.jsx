import { useContext, useRef, forwardRef, useState } from "react";
// import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./Events.module.scss";

import EventsCard from "@/components/EventsCard";
import icons from "./icons";
import Slider from "react-slick";

import Image from "next/image";

function splitAndSortDates(events) {
  const currentDate = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.endDate) >= currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const previousEvents = events
    .filter((event) => new Date(event.endDate) < currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    upcomingEvents,
    previousEvents,
    upcomingEventsIndex: previousEvents.length,
  };
}

const Events = forwardRef(function ({ visible, id, events }, ref) {
  // const { lang } = useContext(LanguageContext);
  const [eventsData, setEventsData] = useState(splitAndSortDates(events));
  const { mobile } = useContext(ScreenModeAndSizeContext);

  const sliderRef = useRef(null);

  const getDateText = ({ startDate, endDate, ...rest }) => {
    if (startDate === endDate) {
      const [year, month, day] = startDate.split("-");

      return `${month}/${day}`;
    } else {
      const [startYear, startMonth, startDay] = startDate.split("-");
      const [endYear, endMonth, endDay] = endDate.split("-");

      return `${startMonth}/${startDay}-${endMonth}/${endDay}`;
    }
  };

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
  };
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
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
            status={"past"}
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
            status={"upcoming"}
          />
        ))}
      </Slider>
    </section>
  );
});

Events.displayName = "Events";
export default Events;
