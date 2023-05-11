// import "@/app/globals.css";
import style from "./OurResults.module.css";
import CountResults from "@/components/CountResults";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
const ourResultsText = {
  blockInfo: {
    prosthetics: {
      eng: `Prosthetics`,
    },
    prostheses: {
      eng: `Prostheses`,
    },
    volunteers: {
      eng: `Volunteers`,
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
const OurResults = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);

  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <SmokeBackground />
      <div className={`${style.block}`}>
        <div className={`${style.leftBlock} textContainer`}>
          {icons.titleSVG("svgTextBlock")}
        </div>

        <div className={`${style.countBlock}`}>
          {Object.keys(ourResultsText.blockInfo).map((text, i) => (
            <CountResults
              inViewport={visible}
              key={i}
              count={ResultsCounts[i]}
              text={ourResultsText.blockInfo[text][lang]}
              styleMod={style.styleMod}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
OurResults.displayName = "OurResults";
export default OurResults;
