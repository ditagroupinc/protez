'use client'

import React, { ReactElement, createContext, useContext } from 'react'
import { useWindowSize } from 'react-use'

interface ScreenModeAndSizeContextValue {
  width: number
  height: number
  mobile: boolean
  tablet: boolean
  tabletLarge: boolean
  desktopSmall: boolean
  desktop: boolean
  screenModeClass: string
}

const ScreenModeAndSizeContext = createContext<ScreenModeAndSizeContextValue | undefined>(undefined)

const ScreenModeAndSizeContextProvider = ({ children }: { children: ReactElement }) => {
  const { width, height } = useWindowSize()

  const mobile = width <= 500
  const tablet = width > 500 && width <= 768
  const tabletLarge = width > 768 && width <= 1024
  const desktopSmall = width > 1024 && width <= 1280
  const desktop = width > 1280

  const screenModeClass = mobile
    ? 'mobile'
    : tablet
      ? 'tablet'
      : tabletLarge
        ? 'tabletLarge'
        : desktopSmall
          ? 'desktopSmall'
          : 'desktop'

  const contextValue: ScreenModeAndSizeContextValue = {
    width,
    height,
    mobile,
    tablet,
    tabletLarge,
    desktopSmall,
    desktop,
    screenModeClass,
  }

  return (
    <ScreenModeAndSizeContext.Provider value={contextValue}>
      {children}
    </ScreenModeAndSizeContext.Provider>
  )
}

export const useScreenModeAndSize = (): ScreenModeAndSizeContextValue => {
  const context = useContext(ScreenModeAndSizeContext)
  if (context === undefined) {
    throw new Error('useScreenModeAndSize must be used within a ScreenModeAndSizeContextProvider')
  }
  return context
}

export default ScreenModeAndSizeContextProvider
