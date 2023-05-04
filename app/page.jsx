"use client";
import Image from "next/image";
import "@/styles/fonts.css";
import "@/styles/resetCSS.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { throttle } from "@/utils";
import { useContext, useState, createContext, useEffect } from "react";

import Header from "@/sections/Header";
import LetsGiveHope from "@/sections/LetsGiveHope";
import Veterans from "@/sections/Veterans";
import OurMission from "@/sections/OurMission";
import MeetOurTeam from "@/sections/MeetOurTeam";
import OurPartners from "@/sections/OurPartners";

import News from "@/sections/News";
import InNeed from "@/sections/InNeed";
import OurResults from "@/sections/OurResults";

import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./index.module.css";
import MailingList from "@/sections/MailingList";

export default function Home() {
  const [lang, setLang] = useState("eng");
  const [windowSizes, setWindowSizes] = useState({ width: null, height: null });
  useEffect(() => {
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
        mobile: windowWidth <= 420,
        tablet: windowWidth <= 1180,
        tabletLarge: windowWidth <= 1366,
        desktopSmall: windowWidth <= 1920,
        desktop: windowWidth >= 1921,
        screenModeClass,
      });
    };
    getSize();
    window.addEventListener("resize", throttle(getSize, 150));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header />
        <main style={{ backgroundColor: "var(--black)" }}>
          <div className={style.flagsBlock}>
            <LetsGiveHope />
            {/* <OurMission /> */}
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
          {/* <OurResults />
          <InNeed />
          <Veterans />
          <MeetOurTeam />
          <OurPartners />
          <News /> */}
          <MailingList />
        </main>
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}

//       <MeetOurTeam />
