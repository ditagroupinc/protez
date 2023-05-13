import style from "./thankYou.module.css";
import SquareButton from "@/components/SquareButton";
import { icons } from "./icons";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext, forwardRef } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";

import Copyright from "@/components/Copyright";

const ourResultsText = {
  becomeAVolunteer: {
    eng: "Protez Academy",
  },
  giveHope: {
    eng: "Give Hope",
  },
};

const ThankYou = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, mobile, tablet, tabletLarge, desktopSmall } = useContext(
    ScreenModeAndSizeContext
  );

  const handleClick = () => console.log("clicked");
  return (
    <footer className={`${visible ? "showText" : ""}`} id={id} ref={ref}>
      <div className={`${style.colorContainer} ${style.colorContainer}`}>
        <div className={style.container}>
          <div className="textContainer">
            {mobile
              ? icons.thankYouIconMobile("svgTextBlock")
              : icons.thankYouIcon("svgTextBlock")}
          </div>
          <div className={style.buttonsContainer}>
            <SquareButton
              blank
              link
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              onClick={handleClick}
              text={ourResultsText.becomeAVolunteer[lang]}
              className={style.button}
            />
            <SquareButton
              black
              onClick={handleClick}
              text={ourResultsText.giveHope[lang]}
              className={style.button}
            />
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
});

ThankYou.displayName = "ThankYou";
export default ThankYou;
