import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./LetsGiveHope.module.css";

// import video from "../../public/ukraine-110268.mp4";

const letsGiveHopeText = {
  lets: {
    eng: "Let’s",
  },
  giveHope: {
    eng: "give hope",
  },
  together: {
    eng: "together",
  },
};

export default function LetsGiveHope({}) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile } = useContext(ScreenModeAndSizeContext);
  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };
  return (
    <section className={style.section} style={{ height: height }}>
      <video autoPlay loop muted className={style.video}>
        <source src="flag-ukraine.mp4" type="video/mp4" />
      </video>
      <h1 className={style.mainTitle}>
        <span>{letsGiveHopeText.lets[lang]}</span>
        <span>{letsGiveHopeText.giveHope[lang]}</span>
        <span>{letsGiveHopeText.together[lang]}</span>
      </h1>
    </section>
  );
}
