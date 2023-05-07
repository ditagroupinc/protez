import { useContext, useRef, useState, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./Veterans.module.css";
import Image from "next/image";
import Slider from "react-slick";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
import CustomCursor from "@/components/CustomCursor";

const veteransText = {
  veterans: [
    {
      ageRank: {
        eng: "30 years old, sergeant.",
      },
      name: {
        eng: "Vadym",
      },
      surname: {
        eng: "Fedorov",
      },
      title: {
        eng: "Vadym has dedicated 10 years to the Ukrainian Army. ",
      },
      text: {
        eng: "Defending Ukraine, he lost two legs with high amputations. Vadym is motivated and does not give up, he inspires everyone with his example. Vadym is currently in the USA undergoing prosthetics fitting and rehabilitation.  Only with your help we are able to fit Vadym with modern bionic prosthetics and return him to a full life. Together we are united and strong. Thank you for sharing this post and for your donations",
      },
      img: "vadymFedorov.png",
      icon: "vadymFedorov",
      video: "https://www.youtube.com/embed/D1zR9DkYgu4",
    },
    {
      ageRank: {
        eng: "30 years old, sergeant.",
      },
      name: {
        eng: "Vadym",
      },
      surname: {
        eng: "Fedorov",
      },
      title: {
        eng: "Vadym has dedicated 10 years to the Ukrainian Army. ",
      },
      text: {
        eng: "Defending Ukraine, he lost two legs with high amputations. Vadym is motivated and does not give up, he inspires everyone with his example. Vadym is currently in the USA undergoing prosthetics fitting and rehabilitation.  Only with your help we are able to fit Vadym with modern bionic prosthetics and return him to a full life. Together we are united and strong. Thank you for sharing this post and for your donations",
      },
      img: "vadymFedorov.png",
      icon: "vadymFedorov",
      video: "https://www.youtube.com/embed/D1zR9DkYgu4",
    },
    {
      ageRank: {
        eng: "30 years old, sergeant.",
      },
      name: {
        eng: "Vadym",
      },
      surname: {
        eng: "Fedorov",
      },
      title: {
        eng: "Vadym has dedicated 10 years to the Ukrainian Army. ",
      },
      text: {
        eng: "Defending Ukraine, he lost two legs with high amputations. Vadym is motivated and does not give up, he inspires everyone with his example. Vadym is currently in the USA undergoing prosthetics fitting and rehabilitation.  Only with your help we are able to fit Vadym with modern bionic prosthetics and return him to a full life. Together we are united and strong. Thank you for sharing this post and for your donations",
      },
      img: "vadymFedorov.png",
      icon: "vadymFedorov",
      video: "https://www.youtube.com/embed/D1zR9DkYgu4",
    },
  ],

  share: {
    eng: "Share me",
  },
  next: {
    eng: "Next  →",
  },
  videoButton: {
    eng: "get better known",
  },
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

const Veterans = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, tablet } = useContext(
    ScreenModeAndSizeContext
  );
  const [frameOpened, setFrameOpened] = useState(false);

  const frameLink = useRef("");

  const sliderRef = useRef();
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <SampleNextArrow />,
  };
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      {/* <CustomCursor id={style.veterans} /> */}
      <SmokeBackground />
      <div className={style.sliderWrapper}>
        <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
          {veteransText.veterans.map((element, index) => (
            <div key={index}>
              <div className={style.sliderCard}>
                <div className={`${style.leftSide} textContainer`}>
                  <h5 className={`h5 ${style.ageRank}`}>
                    {element.ageRank[lang]}
                  </h5>
                  {icons[element.icon](`${style.veteranLogo} svgTextBlock`)}
                  <h4 className={`h2 ${style.cardTitle}`}>
                    {element.title[lang]}
                  </h4>
                  <p className={`p ${style.cardText}`}>{element.text[lang]}</p>

                  <div className={style.shareMe}>
                    <span className={`h5`}>{veteransText.share[lang]}</span>
                    <div className={`${style.buttonsList}`}>
                      <a target="blank" href="#">
                        {icons.iconTwitter()}
                      </a>
                      <a target="blank" href="#">
                        {icons.iconLinkedin()}
                      </a>
                      <a target="blank" href="#">
                        {icons.iconFacebook()}
                      </a>
                      <a target="blank" href="#">
                        {icons.iconLink()}
                      </a>
                    </div>
                  </div>
                </div>
                <div className={style.rightSide}>
                  <Image
                    src={`/veterans/${element.img}`}
                    priority
                    alt={element.name[lang] + " " + element.surname[lang]}
                    className={style.photo}
                    width={1306}
                    height={1890}
                  />
                  <button
                    className={style.roundButton}
                    onClick={() => {
                      frameLink.current = element.video;
                      setFrameOpened(!frameOpened);
                    }}
                  >
                    {icons[`${element.icon}Icon`]()}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button onClick={gotoNext} className={style.nextSlideButton}>
          {veteransText.next[lang]}
        </button>
      </div>
      {frameOpened && (
        <>
          <div
            className={style.mask}
            onClick={() => setFrameOpened(!frameOpened)}
          />
          <iframe
            className={style.iFrame}
            width="560"
            height="315"
            src={frameLink.current}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          />
        </>
      )}
    </section>
  );
});

Veterans.displayName = "Veterans";
export default Veterans;
