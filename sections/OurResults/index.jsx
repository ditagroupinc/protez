// import "@/app/globals.css";
import style from "./OurResults.module.css";
import CountResults from "@/components/CountResults";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { switchWindowSize } from "@/utils/switchWindowSize";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
const OurResultsText = {
  blockInfo: {
    prosthetics: {
      eng: `Prosthetics`,
    },
    prostheses: {
      eng: `Prostheses`,
    },
    volontiers: {
      eng: `Volontiers`,
    },
    moneySpent: {
      eng: `Money spent`,
    },
  },
  titleText: {
    our: {
      eng: "Our",
    },
    results: {
      eng: "Results",
    },
  },
};

const ResultsCounts = ["76", "196", "290", "1300000"];
const OurResults = () => {
  const { lang } = useContext(LanguageContext);
  const { mobile, tablet, tabletLarge, desktopSmall } = useContext(
    ScreenModeAndSizeContext
  );
  const mobileDesktopClass = () => {
    return switchWindowSize(style, mobile, tablet, tabletLarge, desktopSmall);
  };

  const BlocksCounts = Object.keys(OurResultsText.blockInfo).map((text, i) => {
    return (
      <CountResults
        key={i}
        count={ResultsCounts[i]}
        text={OurResultsText.blockInfo[text][lang]}
        styleMod={style.styleMod}
      />
    );
  });

  return (
    <section className={` section`} id={style.ourResults}>
      <SmokeBackground />
      <div className={`${style.block}`}>
        <div className={style.leftBlock}>{icons.titleSVG("svgTextBlock")}</div>

        <div className={`${style.countBlock}`}>{BlocksCounts}</div>
      </div>
    </section>
  );
};

export default OurResults;
