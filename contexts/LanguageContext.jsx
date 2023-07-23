"use client";
import { createContext, useState } from "react";
export const LanguageContext = createContext("eng");
const LanguageContextProvider = ({ children }) => {
  const [lang, setLang] = useState("ukrainian");
  const value = {
    lang,
    setLang,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
