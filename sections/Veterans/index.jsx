import { useContext, useRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./Veterans.module.css";
import Image from "next/image";
import Slider from "react-slick";

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
      img: "vadimFedorov.png",
      icon: "vadymFedorov.svg",
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
      img: "vadimFedorov.png",
      icon: "vadymFedorov.svg",
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
      img: "vadimFedorov.png",
      icon: "vadymFedorov.svg",
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

const IconLinkedin = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.3333 7C45.571 7 46.758 7.49167 47.6332 8.36683C48.5083 9.242 49 10.429 49 11.6667V44.3333C49 45.571 48.5083 46.758 47.6332 47.6332C46.758 48.5083 45.571 49 44.3333 49H11.6667C10.429 49 9.242 48.5083 8.36683 47.6332C7.49167 46.758 7 45.571 7 44.3333V11.6667C7 10.429 7.49167 9.242 8.36683 8.36683C9.242 7.49167 10.429 7 11.6667 7H44.3333ZM43.1667 43.1667V30.8C43.1667 28.7826 42.3652 26.8478 40.9387 25.4213C39.5122 23.9947 37.5774 23.1933 35.56 23.1933C33.5767 23.1933 31.2667 24.4067 30.1467 26.2267V23.6367H23.6367V43.1667H30.1467V31.6633C30.1467 29.8667 31.5933 28.3967 33.39 28.3967C34.2564 28.3967 35.0873 28.7408 35.6999 29.3535C36.3125 29.9661 36.6567 30.797 36.6567 31.6633V43.1667H43.1667ZM16.0533 19.9733C17.093 19.9733 18.09 19.5603 18.8252 18.8252C19.5603 18.09 19.9733 17.093 19.9733 16.0533C19.9733 13.8833 18.2233 12.11 16.0533 12.11C15.0075 12.11 14.0045 12.5255 13.265 13.265C12.5255 14.0045 12.11 15.0075 12.11 16.0533C12.11 18.2233 13.8833 19.9733 16.0533 19.9733ZM19.2967 43.1667V23.6367H12.8333V43.1667H19.2967Z"
      fill="white"
    />
  </svg>
);

const IconFB = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.9998 4.75977C15.1665 4.75977 4.6665 15.2364 4.6665 28.1398C4.6665 39.8064 13.2065 49.4898 24.3598 51.2398V34.9064H18.4332V28.1398H24.3598V22.9831C24.3598 17.1264 27.8365 13.9064 33.1798 13.9064C35.7232 13.9064 38.3832 14.3498 38.3832 14.3498V20.1131H35.4432C32.5498 20.1131 31.6398 21.9098 31.6398 23.7531V28.1398H38.1265L37.0765 34.9064H31.6398V51.2398C37.1382 50.3714 42.145 47.566 45.7563 43.3299C49.3677 39.0938 51.3457 33.7063 51.3332 28.1398C51.3332 15.2364 40.8332 4.75977 27.9998 4.75977Z"
      fill="white"
    />
  </svg>
);

const IconLink = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.7099 31.2899C25.6666 32.1999 25.6666 33.6932 24.7099 34.6032C23.7999 35.5132 22.3066 35.5132 21.3966 34.6032C16.8466 30.0532 16.8466 22.6566 21.3966 18.1066L29.6566 9.84658C34.2066 5.29658 41.6032 5.29658 46.1532 9.84658C50.7033 14.3966 50.7033 21.7932 46.1532 26.3432L42.6766 29.8199C42.6999 27.9066 42.3966 25.9932 41.7432 24.1732L42.8399 23.0532C45.5933 20.3232 45.5933 15.8899 42.8399 13.1599C40.1099 10.4066 35.6766 10.4066 32.9466 13.1599L24.7099 21.3966C21.9566 24.1266 21.9566 28.5599 24.7099 31.2899ZM31.2899 21.3966C32.1999 20.4866 33.6932 20.4866 34.6032 21.3966C39.1532 25.9466 39.1532 33.3432 34.6032 37.8932L26.3432 46.1532C21.7932 50.7033 14.3966 50.7033 9.84658 46.1532C5.29658 41.6032 5.29658 34.2066 9.84658 29.6566L13.3232 26.1799C13.2999 28.0932 13.6032 30.0066 14.2566 31.8499L13.1599 32.9466C10.4066 35.6766 10.4066 40.1099 13.1599 42.8399C15.8899 45.5933 20.3232 45.5933 23.0532 42.8399L31.2899 34.6032C34.0432 31.8732 34.0432 27.4399 31.2899 24.7099C30.3332 23.7999 30.3332 22.3066 31.2899 21.3966Z"
      fill="white"
    />
  </svg>
);

const IconTwitter = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52.4066 14.0002C50.6099 14.8168 48.6733 15.3535 46.6666 15.6102C48.7199 14.3735 50.3066 12.4135 51.0533 10.0568C49.1166 11.2235 46.9699 12.0402 44.7066 12.5068C42.8633 10.5002 40.2733 9.3335 37.3333 9.3335C31.8499 9.3335 27.3699 13.8135 27.3699 19.3435C27.3699 20.1368 27.4633 20.9068 27.6266 21.6302C19.3199 21.2102 11.9233 17.2202 6.99993 11.1768C6.1366 12.6468 5.6466 14.3735 5.6466 16.1935C5.6466 19.6702 7.3966 22.7502 10.1033 24.5002C8.4466 24.5002 6.9066 24.0335 5.55326 23.3335C5.55326 23.3335 5.55326 23.3335 5.55326 23.4035C5.55326 28.2568 9.0066 32.3168 13.5799 33.2268C12.7399 33.4602 11.8533 33.5768 10.9433 33.5768C10.3133 33.5768 9.68326 33.5068 9.0766 33.3902C10.3366 37.3335 13.9999 40.2735 18.4099 40.3435C15.0033 43.0502 10.6866 44.6368 5.97326 44.6368C5.17993 44.6368 4.3866 44.5902 3.59326 44.4968C8.0266 47.3435 13.2999 49.0002 18.9466 49.0002C37.3333 49.0002 47.4366 33.7402 47.4366 20.5102C47.4366 20.0668 47.4366 19.6468 47.4133 19.2035C49.3733 17.8035 51.0533 16.0302 52.4066 14.0002Z"
      fill="white"
    />
  </svg>
);

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

export default function Veterans() {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );

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
      className={style.section + " section veterans"}
      style={{ height: height }}
    >
      <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
        {veteransText.veterans.map((element, index) => (
          <div key={index}>
            <div className={style.sliderCard}>
              <div className={style.leftSide}>
                <h5 className={`h5 ${screenModeClass} ${style.ageRank}`}>
                  {element.ageRank[lang]}
                </h5>
                <h3 className={style.nameSurname}>
                  <Image
                    src={`/veterans/${element.icon}`}
                    priority
                    alt={element.name[lang] + " " + element.surname[lang]}
                    width={692}
                    height={194}
                    // className={style.photo}
                  />
                  {/* <span>{element.name[lang]}</span>
                  <span>{element.surname[lang]}</span> */}
                </h3>
                <h4 className={`h2 ${screenModeClass} ${style.cardTitle}`}>
                  {element.title[lang]}
                </h4>
                <p className={`p ${screenModeClass} ${style.cardText}`}>
                  {element.text[lang]}
                </p>

                <div className={style.shareMe}>
                  <span className={`h5 ${screenModeClass}`}>
                    {veteransText.share[lang]}
                  </span>
                  <div className={`${screenModeClass} ${style.buttonsList}`}>
                    <a href="#">
                      <IconTwitter />
                    </a>
                    <a href="#">
                      <IconLinkedin />
                    </a>
                    <a href="#">
                      <IconFB />
                    </a>
                    <a href="#">
                      <IconLink />
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
                {/* <img
                  src={`/veterans/${element.img}`}
                  alt="Picture of the author"
                  className={style.photo}
                /> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button onClick={gotoNext} className={style.nextSlideButton}>
        {veteransText.next[lang]}
      </button>
    </section>
  );
}
