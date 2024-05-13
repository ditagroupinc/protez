'use client'

import { createContext, useState, useContext, ReactElement, useEffect } from 'react'
import { Languages } from '@/types'

export interface LanguageContext {
  lang: Languages
  setLang: (lang: Languages) => void
}

export const LanguageContext = createContext<LanguageContext | undefined>(undefined)

const LanguageContextProvider = ({ children }: { children: ReactElement }) => {
  const [lang, setLang] = useState<Languages>(Languages.English)

  useEffect(() => {
    const localStorageLang = localStorage.getItem('lang')

    if (typeof localStorageLang === 'string') {
      setLang(localStorageLang as Languages)
      localStorage.setItem('lang', localStorageLang)
    }
  }, [])

  const value = {
    lang,
    setLang,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContext => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a PageSettingsProvider')
  }

  return context
}

export default LanguageContextProvider
