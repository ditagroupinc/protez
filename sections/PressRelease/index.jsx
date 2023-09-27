import { useContext, useRef, forwardRef, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

import style from "./PressRelease.module.scss";

import icons from "./icons";
import Slider from "react-slick";

import PressReleaseCard from "@/components/PressReleaseCard";
import texts from "@/texts&svg";

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

const pressReleaseCard = {
  image: "/pressReleaseTempImage.png",
  date: "27.03.2023",
  title: "Head of Zakarpattia Region",
  text: "The head of Zakarpattia Oblast, Viktor Mykyta, visited the Protez Foundation prosthesis clinic in the city of Svalyava. One of the goals is to improve prosthetics and rehabilitation for the military. We express our gratitude to the governor for his support and active position in supporting Ukrainian veterans.",
};

const PressRelease = forwardRef(function ({ visible, id, pressReleases }, ref) {
  const { lang } = useContext(LanguageContext);
  // const [eventsData, setEventsData] = useState(splitAndSortDates(events));
  // const { height, width, mobile, tablet, screenModeClass } = useContext(
  //   ScreenModeAndSizeContext
  // );

  console.log(pressReleases);

  const sliderRef = useRef(null);
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  // const getEventCardStatus = (date) => {
  //   const currentDate = new Date();
  //   const result =
  //     new Date(parseDate(date)) < currentDate ? "past" : "upcoming";
  //   return result;
  // };

  // const getDateText = (date) => {
  //   const [day, month, year] = date.split(".");
  //   return `${month}/${day}`;
  // };

  const settings = {
    dots: true,
    appendDots: (dots) => (
      <>
        <div className={style.sliderNavigation}>
          <button onClick={gotoNext} className={style.nextSlideButton}>
            {texts.pressRelease.next[lang]}
          </button>
          <ul className={style.slickDots}>{dots}</ul>
        </div>
      </>
    ),
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,

    swipeToSlide: true,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 5000,
  };
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={`textContainer ${style.logo}`}>
        {icons.pressReleaseLogo.desktop[lang](`svgTextBlock`)}
      </div>

      <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
        {pressReleases.map((pressRelease, index) => (
          <div className={style.sliderSlidePadding} key={index}>
            <PressReleaseCard
              image={pressRelease.image}
              date={pressRelease.date}
              title={pressRelease.title}
              text={pressRelease.text}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
});

PressRelease.displayName = "PressRelease";
export default PressRelease;
