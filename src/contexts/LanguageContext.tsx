'use client'

import { createContext, useState, useEffect, ReactNode, FunctionComponent } from 'react'
import { Languages } from '@/types'

export interface ILanguageContext {
  lang: Languages
  setLang: (lang: Languages) => void
}

export const LanguageContext = createContext<ILanguageContext>({
  lang: Languages.english,
  setLang: () => {},
})

interface LanguageContextProviderProps {
  children: ReactNode
}

const LanguageContextProvider: FunctionComponent<LanguageContextProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Languages>(Languages.english)

  useEffect(() => {
    const localStorageLang = localStorage.getItem('lang')
    const defaultLang = (localStorageLang as Languages) || Languages.english

    if (typeof defaultLang === 'string') {
      setLang(defaultLang)
      localStorage.setItem('lang', defaultLang)
    }
  }, [])

  const value = {
    lang,
    setLang,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageContextProvider
