import { useContext, useRef, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

import style from "./PressRelease.module.scss";

import icons from "./icons";
import Slider from "react-slick";

import PressReleaseCard from "@/components/PressReleaseCard";
import texts from "@/texts&svg";

const PressRelease = forwardRef(function ({ visible, id, pressReleases }, ref) {
  const { lang } = useContext(LanguageContext);
  const sliderRef = useRef(null);
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

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
    autoplay: true,
    autoplaySpeed: 5000,
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
