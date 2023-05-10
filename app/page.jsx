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
import style from "./index.module.css";
import useInViewPort from "@/hooks/useInViewPort";

// import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [lang, setLang] = useState("eng");
  const [windowSizes, setWindowSizes] = useState({ width: null, height: null });
  const [visitedSections, setVisitedSections] = useState({});

  const ourResults = useRef(null);
  const inNeed = useRef(null);
  const ourMission = useRef(null);
  const prosthetics = useRef(null);
  const veterans = useRef(null);
  const ourTeam = useRef(null);
  const ourPartners = useRef(null);
  const news = useRef(null);
  const mailingList = useRef(null);
  const thankYou = useRef(null);

  const paramsForObserver = () => {
    const refs = {
      ourMission: ourMission,
      ourResults: ourResults,
      inNeed: inNeed,
      prosthetics: prosthetics,
      veterans: veterans,
      ourTeam: ourTeam,
      ourPartners: ourPartners,
      news: news,
      mailingList: mailingList,
      thankYou: thankYou,
      ourPartners: ourPartners,
    };
    Object.keys(visitedSections).forEach((key) => {
      delete refs[key];
    });
    return Object.values(refs);
  };

  const visibleSection = useInViewPort(paramsForObserver());

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

  const isVisible = (id) => {
    if (visitedSections[id]) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getSize();
    window.addEventListener("resize", throttle(getSize, 150));
    window.scrollTo(0, 0);

    window.addEventListener(
      "scroll",
      throttle((e) => console.log(e), 150)
    );
  }, []);

  useEffect(() => {
    setVisitedSections({ ...visitedSections, ...visibleSection });
  }, [visibleSection]);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header />
        {/* <CustomCursor /> */}
        <main style={{ backgroundColor: "var(--black)" }}>
          <div className={style.flagsBlock}>
            <LetsGiveHope
              id={"letsGiveHope"}
              visible={isVisible("letsGiveHope")}
            />
            <OurMission
              ref={ourMission}
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
            ref={ourResults}
            visible={isVisible("ourResults")}
            id="ourResults"
          />
          <InNeed ref={inNeed} visible={isVisible("inNeed")} id="inNeed" />
          <Prosthetics
            ref={prosthetics}
            id="prosthetics"
            visible={isVisible("prosthetics")}
          />
          <Veterans
            ref={veterans}
            id="veterans"
            visible={isVisible("veterans")}
          />
          <OurTeam ref={ourTeam} id="ourTeam" visible={isVisible("ourTeam")} />
          <OurPartners
            ref={ourPartners}
            id="ourPartners"
            visible={isVisible("ourPartners")}
          />
          <News ref={news} id="news" visible={isVisible("news")} />
          <MailingList
            ref={mailingList}
            id="mailingList"
            visible={isVisible("mailingList")}
          />
        </main>
        <ThankYou
          ref={thankYou}
          id="thankYou"
          visible={isVisible("thankYou")}
        />
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}
