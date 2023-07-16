"use client";
import { createContext, useState } from "react";
export const LanguageContext = createContext("eng");
const LanguageContextProvider = ({ children }) => {
  const [lang, setLang] = useState("eng");
  const changeLanguage = (newLanguage) => {
    setLang(newLanguage);
  };
  const value = {
    lang,
    changeLanguage,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
