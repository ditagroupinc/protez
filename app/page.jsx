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

import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./index.module.css";

const getSize = () => {
  const win = window;
  const doc = document;
  const docElem = doc.documentElement;
  const body = doc.getElementsByTagName("body")[0];
  const windowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth;
  const windowHeight =
    win.innerHeight || docElem.clientHeight || body.clientHeight;
  const mobile = false;
  const screenModeClass = mobile ? "mobile" : "desktop";
  return {
    width: windowWidth,
    height: windowHeight,
    mobile: false,
    screenModeClass,
  };
};

export default function Home() {
  const [lang, setLang] = useState("eng");
  const [windowSizes, setWindowSizes] = useState(getSize());
  const updateSized = () => {
    setWindowSizes(getSize());
  };
  useEffect(() => {
    window.addEventListener("resize", throttle(updateSized, 150));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header />
        <main style={{ backgroundColor: "var(--black)" }}>
          <div className={style.flagsBlock}>
            <LetsGiveHope />
            <OurMission />
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
          <Veterans />
        </main>
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}
