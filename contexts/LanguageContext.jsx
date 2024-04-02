'use client'
import { createContext, useState, useEffect } from 'react'
export const LanguageContext = createContext('eng')

const LanguageContextProvider = ({ children }) => {
  const [lang, setLang] = useState('english')
  useEffect(() => {
    const localStorageLang = localStorage.getItem('lang')
    const defaultLang = !!localStorageLang ? localStorageLang : 'english'

    setLang(defaultLang)
    localStorage.setItem('lang', defaultLang)
  }, [])
  const value = {
    lang,
    setLang,
  }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageContextProvider
