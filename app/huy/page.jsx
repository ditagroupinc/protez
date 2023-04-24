"use client";
import Image from "next/image";
import "@/styles/fonts.css";
import "@/styles/resetCSS.css";
import { throttle } from "@/utils";
import { useContext, useState, createContext, useEffect } from "react";

import Header from "@/sections/Header";

const LanguageContext = createContext({ lang: "", changeLang: () => {} });
const ScreenModeAndSizeContext = createContext({
  width: null,
  height: null,
  mobile: false,
});

export default function Huy() {
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

      setWindowSizes({
        width: windowWidth,
        height: windowHeight,
        mobile: false,
      });
    };
    getSize();
    window.addEventListener("resize", throttle(getSize, 150));
  }, []);
  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ScreenModeAndSizeContext.Provider value={windowSizes}>
        <Header />
        <div style={{ backgroundColor: "var(--black)", height: "500vh" }}></div>
      </ScreenModeAndSizeContext.Provider>
    </LanguageContext.Provider>
  );
}
