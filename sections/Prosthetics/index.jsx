import Card from "@/components/Card";
import style from "./Prosthetics.module.css";
import { useContext, useRef, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import Image from "next/image";
import { icons } from "./icons";
import VideoAndFilter from "@/components/VideoAndFilter";

const ProstheticsText = {
  cards: {
    free: {
      eng: `Free prosthetics for those who lost their limbs as a result of the war. `,
    },
    psychological: {
      eng: `Psychological support and emotional recovery of victims.`,
    },
    unite: {
      eng: `Unite as many people as possible to help victims of war.`,
    },
  },
  titleText: {
    prosthetics: {
      eng: "prosthetics",
    },
    for: {
      eng: "for ",
    },
    ukrainians: {
      eng: "Ukrainians",
    },
  },
  paragraph: {
    top: {
      eng: `Our current project is Prosthetics for Ukrainians.
      `,
    },
    bottom: {
      eng: `The goal of the project is to help Ukrainian children, soldiers and civilians who have lost their limbs during the war to get free quality prosthetics in the USA.`,
    },
  },
};

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
                  <h2 className="h2">{ProstheticsText.paragraph.top[lang]}</h2>
                </div>
                <div className="textContainer">
                  <h2 className="h2">
                    {ProstheticsText.paragraph.bottom[lang]}
                  </h2>
                </div>
              </div>
            </div>
            <div className={`${style.rightSide}`}>
              {Object.keys(ProstheticsText.cards).map((key, i) => (
                <Card
                  key={i}
                  icon={iconsArr[i]}
                  text={ProstheticsText.cards[key][lang]}
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
              <h2>{ProstheticsText.paragraph.top[lang]}</h2>
            </div>
            <br />
            <div className="textContainer">
              <h2>{ProstheticsText.paragraph.bottom[lang]}</h2>
            </div>
          </div>
          {Object.keys(ProstheticsText.cards).map((key, i) => (
            <Card
              key={i}
              icon={iconsArr[i]}
              text={ProstheticsText.cards[key][lang]}
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
