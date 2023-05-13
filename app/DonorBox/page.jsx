"use client";
import "@/styles/fonts.css";
import "@/styles/resetCSS.css";
import { useContext, useState, createContext, useEffect, useRef } from "react";
import Script from "next/script";

import Header from "@/sections/Header";
import { throttle } from "@/utils";
import Copyright from "@/components/Copyright";

import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import CompanyData from "@/components/CompanyData";

import SocialMediaLinks from "@/components/SocialMediaLinks";
import DonorBox from "@/sections/Donorbox";

// import CustomCursor from "@/components/CustomCursor";

export default function Partners() {
  const [lang, setLang] = useState("eng");
  const [windowSizes, setWindowSizes] = useState({ width: null, height: null });
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

  useEffect(() => {
    getSize();
    window.addEventListener("resize", throttledgetSize);

    return () => {
      window.removeEventListener("resize", throttledgetSize);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header notMainPage />
        {/* {windowSizes.desktop && <CompanyData black />} */}
        {windowSizes.desktop && <SocialMediaLinks />}
        <main>
          <DonorBox />
        </main>
        <footer>
          <Copyright />
        </footer>
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}
