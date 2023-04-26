import Title from "@/components/SectionHeaderTitle/Title";
import "@/app/globals.css";
import styles from "./OurResults.module.css";
import CountResults from "@/components/CountResults/CountResults";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";

const OurResultsText = {
  blockInfo: {
    prosthetics: {
      eng: `Prosthetics`,
    },
    prostheses: {
      eng: `Prostheses`,
    },
    volontiers: {
      eng: `Volontiers.`,
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
      eng: "RESULTS",
    },
  },
};

const ResultsCounts = [76, 196, 290, 13000000];
const OurResults = () => {
  const { lang } = useContext(LanguageContext);
  const { height, mobile } = useContext(ScreenModeAndSizeContext);

  const ifResize = () => {
    if (height) {
      return { height: height };
    }
  };

  const BlocksCounts = Object.keys(OurResultsText.blockInfo).map((text, i) => {
    return (
      <CountResults
        key={i}
        count={ResultsCounts[i]}
        text={OurResultsText.blockInfo[text][lang]}
      />
    );
  });

  return (
    <section style={ifResize()} className={`${styles.section}`}>
      <div className={`${styles.block}`}>
        <Title
          italicText={OurResultsText.titleText.our[lang]}
          normalText={OurResultsText.titleText.results[lang]}
          style={styles.title}
        />
        {BlocksCounts}
      </div>
      <div className={`${styles.colorBlock}`}></div>
    </section>
  );
};

export default OurResults;
