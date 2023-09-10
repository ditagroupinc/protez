import { useContext, useRef, forwardRef, useState } from "react";
// import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./Events.module.scss";

import EventsCard from "@/components/EventsCard";
import icons from "./icons";
import Slider from "react-slick";

import Image from "next/image";

const parseDate = (date) => {
  const [day, month, year] = date.split(".");
  return `${year}-${month}-${day}`;
};

function splitAndSortDates(dateArray) {
  const currentDate = new Date();

  const upcomingDates = dateArray
    .filter((event) => new Date(parseDate(event.date)) >= currentDate)
    .sort((a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date)));

  const previousDates = dateArray
    .filter((event) => new Date(parseDate(event.date)) < currentDate)
    .sort((a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date)));

  return {
    events: [...previousDates, ...upcomingDates],
    upcomingEventsIndex: previousDates.length,
  };
}

const Events = forwardRef(function ({ visible, id, events }, ref) {
  // const { lang } = useContext(LanguageContext);
  const [eventsData, setEventsData] = useState(splitAndSortDates(events));
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );

  const sliderRef = useRef(null);

  const getEventCardStatus = (date) => {
    const currentDate = new Date();
    const result =
      new Date(parseDate(date)) < currentDate ? "past" : "upcoming";
    return result;
  };

  const getDateText = (date) => {
    const [day, month, year] = date.split(".");
    return `${month}/${day}`;
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
        {eventsData.events.map((event, index) => (
          <EventsCard
            key={index}
            link={event.link}
            photo={event.image}
            address={event.location}
            title={event.title}
            date={getDateText(event.date)}
            status={getEventCardStatus(event.date)}
          />
        ))}
      </Slider>
    </section>
  );
});

Events.displayName = "Events";
export default Events;
