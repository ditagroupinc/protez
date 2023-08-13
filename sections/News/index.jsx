"use client";
import { useContext, useRef, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./news.module.css";
import NewsCard from "@/components/NewsCard";
import { icons } from "./icons";
import Slider from "react-slick";
import texts from "@/texts&svg";

const News = forwardRef(function ({ visible, id, news }, ref) {
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
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,

          slidesToShow: 1,
          dots: false,
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
      <div className={style.container}>
        <div className={style.logoContainer + " textContainer"}>
          {icons.wereInNewsLogo[lang]("svgTextBlock")}
        </div>
        <div className={style.newsContainer}>
          <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
            {/* texts.news.cards */}
            {news.map((card, index) => (
              <div key={index}>
                <NewsCard
                  link={card.link}
                  photo={card.image}
                  date={card.date}
                  address={card.address}
                  logo={card.logo}
                  title={card.title}
                  text={card.text}
                  cardData={card}
                  short={index % 2 === 0 || width < 480}
                />
              </div>
            ))}
          </Slider>
          <button onClick={gotoNext} className={style.nextSlideButton}>
            {texts.veterans.next[lang]}
          </button>
        </div>
      </div>
    </section>
  );
});

News.displayName = "News";
export default News;
