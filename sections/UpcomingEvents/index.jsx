import { useContext, useRef, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./UpcomingEvents.module.scss";
// import NewsCard from "@/components/NewsCard";
import EventsCard from "@/components/EventsCard";
import { icons } from "./icons";
import Slider from "react-slick";
import texts from "@/texts&svg";

const events = {
  pastEvents: [
    {
      image: "/events/09_04_2023_Seatle.png",
      date: "April 9, 2023",
      location: "Washinton",
      title: "Meet and Greet Ukrainian soldiers in Seattle",
      time: "10:30 AM",
      link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
    },
    {
      image: "/events/09_04_2023_Seatle.png",
      date: "April 9, 2023",
      location: "Washinton",
      title: "Meet and Greet Ukrainian soldiers in Seattle",
      time: "10:30 AM",
      link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
    },
    {
      image: "/events/09_04_2023_Seatle.png",
      date: "April 9, 2023",
      location: "Washinton",
      title: "Meet and Greet Ukrainian soldiers in Seattle",
      time: "10:30 AM",
      link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
    },
  ],
  recentEvent: {
    image: "/events/09_04_2023_Seatle.png",
    date: "April 9, 2023",
    location: "Washinton",
    title: "Meet and Greet Ukrainian soldiers in Seattle",
    time: "10:30 AM",
    link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
  },
  followingEvents: [
    {
      image: "/events/09_04_2023_Seatle.png",
      date: "April 9, 2023",
      location: "Washinton",
      title: "Meet and Greet Ukrainian soldiers in Seattle",
      time: "10:30 AM",
      link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
    },
    {
      image: "/events/09_04_2023_Seatle.png",
      date: "April 9, 2023",
      location: "Washinton",
      title: "Meet and Greet Ukrainian soldiers in Seattle",
      time: "10:30 AM",
      link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
    },
    {
      image: "/events/09_04_2023_Seatle.png",
      date: "April 9, 2023",
      location: "Washinton",
      title: "Meet and Greet Ukrainian soldiers in Seattle",
      time: "10:30 AM",
      link: "https://www.nytimes.com/2023/03/24/world/europe/ukraine-war-amputees.html",
    },
  ],
};

const UpcomingEvents = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );

  const sliderRef = useRef(null);
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: false,
    // responsive: [
    //   {
    //     breakpoint: 1920,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 800,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       centerMode: true,

    //       slidesToShow: 1,
    //       dots: false,
    //     },
    //   },
    // ],
  };

  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.threeColumnsContainer}>
        <div className={`${style.leftColumnContainer}`}>
          <div className={style.eventsColumnContainer}>
            {events.pastEvents.map((event, index) => (
              <EventsCard
                key={index}
                link={event.link}
                photo={event.image}
                date={event.date}
                time={event.time}
                adress={event.adress}
                title={event.title}
                opened={false}
              />
            ))}
          </div>
          <button
            onClick={gotoNext}
            className={`${style.roundButton} ${style.transparent}`}
          >
            ← More past events
          </button>
        </div>
        <div className={`${style.centerColumnContainer}`}>
          <EventsCard
            link={events.recentEvent.link}
            photo={events.recentEvent.image}
            date={events.recentEvent.date}
            time={events.recentEvent.time}
            adress={events.recentEvent.adress}
            title={events.recentEvent.title}
            opened
          />
        </div>
        <div className={`${style.rightColumnContainer}`}>
          <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
            <div className={`${style.eventsColumnContainer}`}>
              {events.followingEvents.map((event, index) => (
                <EventsCard
                  key={index}
                  link={event.link}
                  photo={event.image}
                  date={event.date}
                  time={event.time}
                  adress={event.adress}
                  title={event.title}
                  opened={false}
                />
              ))}
            </div>
          </Slider>
          <button onClick={gotoNext} className={`${style.roundButton} `}>
            More events →
          </button>
        </div>
      </div>
    </section>
  );
});

UpcomingEvents.displayName = "UpcomingEvents";
export default UpcomingEvents;
