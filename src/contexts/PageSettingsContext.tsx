'use client'
import React, { ReactElement, createContext, useContext, useState } from 'react'

interface PageSettingsContextType {
  isBackgroundWhite: boolean
  setIsBackgroundWhite: React.Dispatch<React.SetStateAction<boolean>>
  disabledSections: string[]
  setDisabledSections: React.Dispatch<React.SetStateAction<string[]>>
}

const PageSettingsContext = createContext<PageSettingsContextType | undefined>(undefined)

export const PageSettingsContextProvider = ({ children }: { children: ReactElement }) => {
  const [isBackgroundWhite, setIsBackgroundWhite] = useState<boolean>(false)
  const [disabledSections, setDisabledSections] = useState<string[]>([])

  return (
    <PageSettingsContext.Provider
      value={{ isBackgroundWhite, setIsBackgroundWhite, disabledSections, setDisabledSections }}
    >
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
