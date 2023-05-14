import style from "./MailingList.module.css";
import { useContext, forwardRef, useState, useEffect } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import Image from "next/image";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
import SquareButton from "@/components/SquareButton";
import texts from "@/texts&svg";
import { sendContactForm } from "@/lib/api";

const veteransImages = [
  "/veterans/troops1.png",
  "/veterans/troops2.png",
  "/veterans/troops4.png",
  "/veterans/troops5.png",
  "/veterans/troops3.png",
  "/veterans/troops4.png",
  "/veterans/troops5.png",
  "/veterans/troops1.png",
  "/veterans/troops2.png",
  "/veterans/troops4.png",
  "/veterans/troops5.png",
  "/veterans/troops3.png",
];

const MailingList = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const [imagesToShow, setImagesToShow] = useState([]);
  const { height, mobile, tablet, tabletLarge, desktopSmall } = useContext(
    ScreenModeAndSizeContext
  );

  const handleClick = () => console.log("click");

  const myTimer = () => {
    setImagesToShow((prevState) => [...prevState, "img"]);
  };
  useEffect(() => {
    if (!visible) return;

    window.myInterval = setInterval(myTimer, 400);

    if (imagesToShow.length === veteransImages.length) {
      clearInterval(window.myInterval);
    }
    return () => clearInterval(window.myInterval);
  }, [visible, imagesToShow]);

  const addClass = (index) => (index <= imagesToShow.length ? style.show : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target[0].value,
    };
    await sendContactForm(data);
  };

  return (
    <section
      className={`${style.section} ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      {/* <SmokeBackground /> */}
      <div className={`${style.images}`}>
        {veteransImages.map((path, i) => {
          return (
            <div key={i}>
              <Image
                src={path}
                alt="troops"
                priority
                width={2560}
                height={1440}
                className={`${style.image} ${addClass(i)}`}
              />
            </div>
          );
        })}
      </div>
      <div className={`${style.title} h6`}>
        <div className="textContainer">{icons.titleSVG("svgTextBlock")}</div>
        <div className="textContainer">
          <form
            className={`${style.form} h6 `}
            action="POST"
            onSubmit={handleSubmit}
          >
            <input
              className="p"
              placeholder={texts.mailingList.email[lang]}
              type="email"
              name="email"
              id="email"
              required
            />
            <SquareButton
              pink
              onClick={handleClick}
              text={texts.mailingList.subcribe[lang]}
            />
          </form>
        </div>
      </div>
    </section>
  );
});

MailingList.displayName = "MailingList";
export default MailingList;
