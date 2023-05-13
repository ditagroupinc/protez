import Card from "@/components/Card";
import style from "./Prosthetics.module.css";
import { useContext, useRef, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import Image from "next/image";
import { icons } from "./icons";
import VideoAndFilter from "@/components/VideoAndFilter";
import texts from "@/texts&svg";

const TabletLogo = () => (
  <div className={style.logoTablet}>{icons.titleTablet(style.logoTablet)}</div>
);

const iconsArr = [icons.iconIntegration, icons.iconHeart, icons.iconPeople];
const Prosthetics = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { tabletLarge } = useContext(ScreenModeAndSizeContext);

  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <VideoAndFilter src={"protez-foundation.mp4"} />

      <Image
        src="/img-ukraine-map.png"
        object-fit="contain"
        priority
        alt="map of Ukraine"
        width={2560}
        height={1440}
        className={`${style.ukrainianMap}`}
      />

      {tabletLarge ? (
        <>
          {icons.flag(style.flag)}
          <div className={style.flexContainer}>
            <div className={`${style.leftSide}`}>
              <div className={`${style.title} textContainer`}>
                {icons.titleTablet(style.logoTablet)}
              </div>
              <div className={`${style.text}`}>
                <div className="textContainer">
                  <h2 className="h2">
                    {texts.prosthetics.paragraph.top[lang]}
                  </h2>
                </div>
                <div className="textContainer">
                  <h2 className="h2">
                    {texts.prosthetics.paragraph.bottom[lang]}
                  </h2>
                </div>
              </div>
            </div>
            <div className={`${style.rightSide}`}>
              {Object.keys(texts.prosthetics.cards).map((key, i) => (
                <Card
                  key={i}
                  icon={iconsArr[i]}
                  text={texts.prosthetics.cards[key][lang]}
                  reverse
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={`${style.block}`}>
          <div className={`${style.title} textContainer`}>
            {!tabletLarge ? icons.titleDesktop() : <TabletLogo />}
          </div>
          <div className={`${style.text} ${!tabletLarge ? "h2" : "h5"} `}>
            <div className="textContainer">
              <h2>{texts.prosthetics.paragraph.top[lang]}</h2>
            </div>
            <br />
            <div className="textContainer">
              <h2>{texts.prosthetics.paragraph.bottom[lang]}</h2>
            </div>
          </div>
          {Object.keys(texts.prosthetics.cards).map((key, i) => (
            <Card
              key={i}
              icon={iconsArr[i]}
              text={texts.prosthetics.cards[key][lang]}
              reverse
            />
          ))}
        </div>
      )}
    </section>
  );
});

Prosthetics.displayName = "Prosthetics";
export default Prosthetics;
