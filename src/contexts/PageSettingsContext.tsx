'use client'
import React, { ReactElement, createContext, useContext, useState } from 'react'

interface PageSettingsContextType {
  isBackgroundWhite: boolean
  setIsBackgroundWhite: React.Dispatch<React.SetStateAction<boolean>>
}

const PageSettingsContext = createContext<PageSettingsContextType | undefined>(undefined)

export const PageSettingsContextProvider = ({ children }: { children: ReactElement }) => {
  const [isBackgroundWhite, setIsBackgroundWhite] = useState<boolean>(false)

  return (
    <PageSettingsContext.Provider value={{ isBackgroundWhite, setIsBackgroundWhite }}>
      {children}
    </PageSettingsContext.Provider>
  )
}

export const usePageSettings = (): PageSettingsContextType => {
  const context = useContext(PageSettingsContext)
  if (!context) {
    throw new Error('usePageSettings must be used within a PageSettingsProvider')
  }
  return context
}
