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
import CompanyData from "@/components/CompanyData";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import useGetSize from "@/hooks/useGetScreenSizes";

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
  const [thankYouInViewport, setThankYouInViewport] = useState(false);
  const [sectionInViewPort, setSectionInViewPort] = useState("");

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

      const notAddedToStateChecker = !visitedSections[key];
      const footerChecker =
        key === "thankYou" && top <= window.innerHeight + margin;
      const sectionChecker = top <= margin && bottom >= margin;

      if (key === "thankYou") {
        if (top <= window.innerHeight - margin && !thankYouInViewport) {
          console.log("setTrue");
          setVisitedSections((prevState) => {
            return { ...prevState, thankYou: true };
          });
          setThankYouInViewport(true);
        } else if (top >= window.innerHeight && thankYouInViewport) {
          console.log("seFalse");
          setThankYouInViewport(false);
        }
      } else if (key === "letsGiveHope") {
        if (bottom < 0 && visitedSections.letsGiveHope === true) {
          setVisitedSections((prevState) => {
            return { ...prevState, letsGiveHope: false };
          });
        }
      } else if (
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

  useEffect(() => {
    sectionIsVisible();
  }, []);

  useEffect(() => {
    window.removeEventListener("scroll", throttledSectionIsVisible);
    window.addEventListener("scroll", throttledSectionIsVisible);
    return () => {
      window.removeEventListener("scroll", throttledSectionIsVisible);
    };
  }, [visitedSections, thankYouInViewport]);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header />
        {/* <CustomCursor /> */}
        <main style={{ backgroundColor: "var(--black)" }}>
          {windowSizes.width > 700 && !thankYouInViewport && <CompanyData />}
          {windowSizes.desktop && <SocialMediaLinks />}
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
                ? homeText.exploreMore[lang]
                : homeText.backToTop[lang]
            }
            href={visitedSections.letsGiveHope ? "prosthetics" : "letsGiveHope"}
            onClick={sectionIsVisible}
          />
          {/* {visitedSections.letsGiveHope && (
            <BackToTopButton
              text={homeText.backToTop[lang]}
              href={"letsGiveHope"}
              onClick={sectionIsVisible}
            />
          )} */}
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
