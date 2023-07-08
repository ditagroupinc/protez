"use client";
import Image from "next/image";

import { throttle } from "@/utils";
import { useContext, useState, createContext, useEffect, useRef } from "react";

import Header from "@/sections/Header";
import LetsGiveHope from "@/sections/LetsGiveHope";
import Veterans from "@/sections/Veterans";
import OurMission from "@/sections/OurMission";
import OurTeam from "@/sections/OurTeam";
import OurPartners from "@/sections/OurPartners";

import News from "@/sections/News";
import InNeed from "@/sections/InNeed";
import OurResults from "@/sections/OurResults";

import MailingList from "@/sections/MailingList";
import Prosthetics from "@/sections/Prosthetics";
import ThankYou from "@/sections/ThankYou";

import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import BackToTopButton from "@/components/BackToTopButton";
import style from "./index.module.css";
import SmokeBackground from "@/components/SmokeBackground";

import useGetSize from "@/hooks/useGetScreenSizes";
import CompanyDataNonProfit from "@/components/CompanyDataNonProfit";

// import CustomCursor from "@/components/CustomCursor";

const homeText = {
  backToTop: {
    eng: "back to top  →",
  },
  exploreMore: {
    eng: "← Explore more about us",
  },
};

export default function Home() {
  const [lang, setLang] = useState("eng");

  const windowSizes = useGetSize();

  const [visitedSections, setVisitedSections] = useState({});

  const [sectionInViewPort, setSectionInViewPort] = useState("letsGiveHope");
  const [showCompanyData, setShowCompanyData] = useState(true);

  const sectionRefs = {
    letsGiveHope: useRef(null),
    ourResults: useRef(null),
    inNeed: useRef(null),
    ourMission: useRef(null),
    prosthetics: useRef(null),
    veterans: useRef(null),
    ourTeam: useRef(null),
    ourPartners: useRef(null),
    news: useRef(null),
    mailingList: useRef(null),
    thankYou: useRef(null),
  };

  const isVisible = (id) => {
    if (visitedSections[id]) {
      return true;
    }
    return false;
  };

  const sectionIsVisible = (margin = 200) => {
    Object.keys(sectionRefs).forEach((key, index) => {
      const { top, bottom } = sectionRefs[key]?.current.getBoundingClientRect();

      const notVisited = !visitedSections[key];
      const notInViewPort = key !== sectionInViewPort;
      const sectionChecker = top <= margin && bottom >= margin;

      if (key === "thankYou") {
        if (top <= window.innerHeight - margin && notInViewPort) {
          setSectionInViewPort("thankYou");
          showCompanyData && setShowCompanyData(false);
          notVisited &&
            setVisitedSections((prevState) => {
              return { ...prevState, thankYou: true };
            });
        } else if (top >= window.innerHeight - margin) {
          !showCompanyData && setShowCompanyData(true);
        }
      } else if (sectionChecker && notInViewPort) {
        setSectionInViewPort(key);
        notVisited &&
          setVisitedSections((prevState) => {
            return { ...prevState, [key]: true };
          });
      }
    });
  };
  const throttledSectionIsVisible = throttle((e) => {
    sectionIsVisible();
  }, 100);

  useEffect(() => {
    sectionIsVisible();
  }, []);

  useEffect(() => {
    window.removeEventListener("scroll", throttledSectionIsVisible);
    window.addEventListener("scroll", throttledSectionIsVisible);
    return () => {
      window.removeEventListener("scroll", throttledSectionIsVisible);
    };
  }, [visitedSections, sectionInViewPort, showCompanyData]);

  const bgIsWhite = () =>
    sectionInViewPort === "ourTeam" || sectionInViewPort === "ourPartners";
  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header black={bgIsWhite()} />
        <main className={style.main}>
          <CompanyDataNonProfit
            black={bgIsWhite()}
            className={`${style.companyDataNonProfit} ${
              showCompanyData ? "" : "hidden"
            }`}
          />

          {/* <SocialMediaLinks /> */}
          <div className={style.smokeBlock}>
            <SmokeBackground className={style.smokeTop} />
            <div className={style.flagsBlock}>
              <LetsGiveHope
                id={"letsGiveHope"}
                visible={isVisible("letsGiveHope")}
                ref={sectionRefs.letsGiveHope}
              />
              <OurMission
                ref={sectionRefs.ourMission}
                id="ourMission"
                visible={isVisible("ourMission")}
              />
              <Image
                src="/flag-usa.png"
                object-fit="contain"
                priority
                alt="Picture of the author"
                width={1306}
                height={1890}
                className={style.americanFlag}
              />
            </div>
            <OurResults
              ref={sectionRefs.ourResults}
              visible={isVisible("ourResults")}
              id="ourResults"
            />
          </div>
          <InNeed
            ref={sectionRefs.inNeed}
            visible={isVisible("inNeed")}
            id="inNeed"
          />
          <Prosthetics
            ref={sectionRefs.prosthetics}
            id="prosthetics"
            visible={isVisible("prosthetics")}
          />
          <div className={style.smokeBlock}>
            <SmokeBackground className={style.smoke} />
            <Veterans
              ref={sectionRefs.veterans}
              id="veterans"
              visible={isVisible("veterans")}
            />
          </div>
          <OurTeam
            ref={sectionRefs.ourTeam}
            id="ourTeam"
            visible={isVisible("ourTeam")}
          />
          <OurPartners
            ref={sectionRefs.ourPartners}
            id="ourPartners"
            visible={isVisible("ourPartners")}
          />
          <div className={style.smokeBlock}>
            <SmokeBackground className={style.smoke} />
            <News
              ref={sectionRefs.news}
              id="news"
              visible={isVisible("news")}
            />
            <MailingList
              ref={sectionRefs.mailingList}
              id="mailingList"
              visible={isVisible("mailingList")}
            />
          </div>
          {sectionInViewPort !== "letsGiveHope" && (
            <BackToTopButton
              text={homeText.backToTop[lang]}
              href={"letsGiveHope"}
              onClick={sectionIsVisible}
              black={bgIsWhite()}
            />
          )}
        </main>
        <ThankYou
          ref={sectionRefs.thankYou}
          id="thankYou"
          visible={isVisible("thankYou")}
        />
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}
