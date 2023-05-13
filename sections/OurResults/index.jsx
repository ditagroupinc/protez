// import "@/app/globals.css";
import style from "./OurResults.module.css";
import CountResults from "@/components/CountResults";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
const ourResultsText = {
  results: {
    prosthetics: {
      eng: `Prosthetics`,
      number: "76",
    },
    prostheses: {
      eng: `Prostheses`,
      number: "196",
    },
    volunteers: {
      eng: `Volunteers`,
      number: "290",
    },
    moneySpent: {
      eng: `Money spent`,
      number: "1300000",
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

// const ResultsCounts = ["76", "196", "290", "1300000"];
// -------------

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
          {Object.keys(ourResultsText.results).map((card, i) => (
            <NumberCard
              text={ourResultsText.results[card][lang]}
              number={ourResultsText.results[card].number}
              key={i}
            />
            // <CountResults
            //   inViewport={visible}
            //   key={i}
            //   count={ResultsCounts[i]}
            //   card={ourResultsText.results[card.eng][lang]}
            //   styleMod={style.styleMod}
            // />
          ))}
        </div>
      </div>
    </section>
  );
});
OurResults.displayName = "OurResults";
export default OurResults;
