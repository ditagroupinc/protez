// import "@/app/globals.css";
import style from "./OurResults.module.css";
import CountResults from "@/components/CountResults";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
import texts from "@/texts&svg";

const NumberCard = ({ text, number }) => (
  <div className={`${style.counter} textContainer`}>
    <div>
      <span className={`${style.title} h2`}>{text}</span>
    </div>

    <span className={`${style.bigNumb}`}>{number}</span>
  </div>
);

// -----------
const OurResults = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);

  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      {/* <SmokeBackground /> */}
      <div className={`${style.block}`}>
        <div className={`${style.leftBlock} textContainer`}>
          {icons.titleSVG("svgTextBlock")}
        </div>

        <div className={`${style.countBlock}`}>
          {Object.keys(texts.ourResults.results).map((card, i) => (
            <NumberCard
              text={texts.ourResults.results[card][lang]}
              number={texts.ourResults.results[card].number}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
OurResults.displayName = "OurResults";
export default OurResults;
