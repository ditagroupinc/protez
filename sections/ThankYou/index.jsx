import style from "./thankYou.module.css";
import SquareButton from "@/components/SquareButton";
import { icons } from "./icons";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext, forwardRef } from "react";

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

  const handleClick = () => console.log("clicked");
  return (
    <footer className={`${visible ? "showText" : ""}`} id={id} ref={ref}>
      <div className={`${style.colorContainer} ${style.colorContainer}`}>
        <div className={style.container}>
          <div className="textContainer">
            {icons.thankYouIcon("svgTextBlock")}
          </div>
          <div className={style.buttonsContainer}>
            <SquareButton
              link
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              onClick={handleClick}
              text={ourResultsText.becomeAVolunteer[lang]}
            />
            <SquareButton
              black
              onClick={handleClick}
              text={ourResultsText.giveHope[lang]}
            />
          </div>
        </div>
      </div>
      <div className={style.copyright}>
        <span className={style.copyrightText}>
          2023 © Made by DITA GROUP Inc.
        </span>
      </div>
    </footer>
  );
});

ThankYou.displayName = "ThankYou";
export default ThankYou;
