import style from "./InNeed.module.css";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { icons } from "./icons";
import texts from "@/texts&svg";

const InNeed = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, mobile, tablet, tabletLarge, desktopSmall } = useContext(
    ScreenModeAndSizeContext
  );

  const getTitle = () => {
    if (mobile) {
      return icons.inNeedLogo.mobile[lang]("svgTextBlock");
    } else if (tabletLarge) {
      return icons.inNeedLogo.tablet[lang]("svgTextBlock");
    } else {
      return icons.inNeedLogo.desktop[lang]("svgTextBlock");
    }
  };

  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.block}>
        <div className={`${style.title} textContainer`}>{getTitle()}</div>
        <div className={`${style.text} h2 textContainer`}>
          <h2 className={`h2 ${lang === "ua" ? style.ua : ""}`}>
            {texts.inNeed.paragraph[lang]}
          </h2>
        </div>
      </div>
    </section>
  );
});
InNeed.displayName = "InNeed";
export default InNeed;
