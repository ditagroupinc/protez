"use client";
import { useState } from "react";

import { LanguageContext } from "@/contexts/LanguageContext";

import ThankYouPage from "@/sections/ThankYouPage";

export default function Partners() {
  const [lang, setLang] = useState("eng");

  return (
    <LanguageContext.Provider value={{ lang: lang, changeLang: setLang }}>
      <ThankYouPage />
    </LanguageContext.Provider>
  );
}
