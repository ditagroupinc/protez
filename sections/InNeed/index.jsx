import styles from "./InNeed.module.css";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { icons } from "./icons";

const InNeedText = {
  paragraph: {
    eng: `Today, thousands of soldiers, as well as civilian adults and children, are left without homes, without their families, and lost their limbs as a result of hostilities in Ukraine.`,
  },
};

const InNeed = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, mobile, tablet, tabletLarge, desktopSmall } = useContext(
    ScreenModeAndSizeContext
  );

  const getTitle = () => {
    if (mobile) {
      return icons.titleMobileSvg("svgTextBlock");
    } else if (tabletLarge) {
      return icons.titleTabletSvg("svgTextBlock");
    } else {
      return icons.titleSvg("svgTextBlock");
    }
  };

  return (
    <section
      className={`${styles.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={styles.block}>
        <div className={`${styles.title} textContainer`}>{getTitle()}</div>
        <div className={`${styles.text} h2 textContainer`}>
          <h2>{InNeedText.paragraph[lang]}</h2>
        </div>
      </div>
    </section>
  );
});
InNeed.displayName = "InNeed";
export default InNeed;
