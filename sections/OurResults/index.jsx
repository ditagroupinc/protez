// import "@/app/globals.css";
import style from "./OurResults.module.scss";

import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

import { icons } from "./icons";
import texts from "@/texts&svg";

const NumberCard = ({ text, number, className }) => (
  <div className={`${style.counter} textContainer ${className}`}>
    <div>
      <span className={`${style.title} h2`}>{text}</span>
    </div>

    <span className={`${style.bigNumb}`}>{number}</span>
  </div>
);

// -----------
const OurResults = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);

  const getUkraininClassName = () =>
    lang === "ukrainian" ? style.ukrainian : "";
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      {/* <SmokeBackground /> */}
      <div className={`${style.block}`}>
        <div
          className={`${
            style.leftBlock
          } textContainer ${getUkraininClassName()}`}
        >
          {icons.ourResultsLogo[lang](`svgTextBlock `)}
          <h2 className={`h2 ${style.date}`}>{texts.ourResults.date[lang]}</h2>
        </div>

        <div className={`${style.countBlock}`}>
          {Object.keys(texts.ourResults.results).map((card, i) => (
            <NumberCard
              text={texts.ourResults.results[card][lang]}
              number={texts.ourResults.results[card].number}
              key={i}
              className={getUkraininClassName()}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
OurResults.displayName = "OurResults";
export default OurResults;
