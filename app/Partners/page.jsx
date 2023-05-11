"use client";
import "@/styles/fonts.css";
import "@/styles/resetCSS.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useState, createContext, useEffect, useRef } from "react";
import AllOurPartners from "@/sections/AllOurPartners";
import Header from "@/sections/Header";

import OurPartners from "@/sections/OurPartners";

import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";

// import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [lang, setLang] = useState("eng");

  const isVisible = (id) => {
    if (visitedSections[id]) {
      return true;
    }
    return false;
  };

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      {/* <ScreenModeAndSizeContext.Provider value={windowSizes}> */}
      <Header backToMain />
      <main style={{ backgroundColor: "var(--black)" }}>
        <AllOurPartners visible />
      </main>
      <footer />
      {/* </ScreenModeAndSizeContext.Provider> */}
    </LanguageContext.Provider>
  );
}
