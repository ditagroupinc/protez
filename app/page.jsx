"use client";
import Image from "next/image";
import "@/styles/fonts.css";
import "@/styles/resetCSS.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const [windowSizes, setWindowSizes] = useState({ width: null, height: null });
  const [visitedSections, setVisitedSections] = useState({});
  const [disableCompanyData, setDisableCompanyData] = useState(false);

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

  const getSize = () => {
    const win = window;
    const doc = document;
    const docElem = doc.documentElement;
    const body = doc.getElementsByTagName("body")[0];
    const windowWidth =
      win.innerWidth || docElem.clientWidth || body.clientWidth;
    const windowHeight =
      win.innerHeight || docElem.clientHeight || body.clientHeight;
    const mobile = false;
    const screenModeClass = mobile ? "mobile" : "desktop";

    setWindowSizes({
      width: windowWidth,
      height: windowHeight,
      mobile: windowWidth <= 480,
      tablet: windowWidth <= 1180,
      desktop: windowWidth >= 1181,
      tabletLarge: windowWidth <= 1366,
      desktopSmall: windowWidth <= 1920,
      screenModeClass,
    });
  };

  const throttledgetSize = throttle(getSize, 150);

  const isVisible = (id) => {
    if (visitedSections[id]) {
      return true;
    }
    return false;
  };

  const sectionIsVisible = (margin = 200) => {
    Object.keys(sectionRefs).forEach((key, index) => {
      const { top, bottom } = sectionRefs[key]?.current.getBoundingClientRect();

      const notAddedToStateChecker = !visitedSections[key];
      const footerChecker =
        key === "thankYou" && top <= window.innerHeight + margin;
      const sectionChecker = top <= margin && bottom >= margin;

      if (
        key === "thankYou" &&
        top <= window.innerHeight &&
        !disableCompanyData
      ) {
        setDisableCompanyData(true);
      }

      if (
        key === "thankYou" &&
        top >= window.innerHeight &&
        disableCompanyData
      ) {
        setDisableCompanyData(false);
      }

      if (
        key === "letsGiveHope" &&
        bottom < 0 &&
        visitedSections.letsGiveHope === true
      ) {
        setVisitedSections((prevState) => {
          return { ...prevState, letsGiveHope: false };
        });
      }

      if (
        (sectionChecker && notAddedToStateChecker) ||
        (footerChecker && notAddedToStateChecker)
      ) {
        setVisitedSections((prevState) => {
          return { ...prevState, [key]: true };
        });
      }
    });
  };
  const throttledSectionIsVisible = throttle((e) => {
    sectionIsVisible();
  }, 100);

  console.log(visitedSections.letsGiveHope);

  useEffect(() => {
    getSize();
    sectionIsVisible();
    window.addEventListener("resize", throttledgetSize);

    return () => {
      window.removeEventListener("resize", throttledgetSize);
    };
  }, []);

  useEffect(() => {
    window.removeEventListener("scroll", throttledSectionIsVisible);
    window.addEventListener("scroll", throttledSectionIsVisible);
    return () => {
      window.removeEventListener("scroll", throttledSectionIsVisible);
    };
  }, [visitedSections, disableCompanyData]);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header disableCompanyData={disableCompanyData} />
        {/* <CustomCursor /> */}
        <main style={{ backgroundColor: "var(--black)" }}>
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
          <Veterans
            ref={sectionRefs.veterans}
            id="veterans"
            visible={isVisible("veterans")}
          />
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
          <News ref={sectionRefs.news} id="news" visible={isVisible("news")} />
          <MailingList
            ref={sectionRefs.mailingList}
            id="mailingList"
            visible={isVisible("mailingList")}
          />
          <BackToTopButton
            text={
              visitedSections.letsGiveHope
                ? homeText.exploreMore.eng
                : homeText.backToTop.eng
            }
            href={visitedSections.letsGiveHope ? "prosthetics" : "letsGiveHope"}
            onClick={sectionIsVisible}
          />
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
