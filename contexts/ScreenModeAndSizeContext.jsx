'use client'
import { createContext, useState, useEffect } from 'react'
import { throttle } from '@/utils'

const contextDefaultValues = {
  width: null,
  height: null,
  mobile: false,
  tablet: false,
  desktop: false,
  tabletLarge: false,
  desktopSmall: false,
  screenModeClass: '',
}

export const ScreenModeAndSizeContext = createContext(contextDefaultValues)

const ScreenModeAndSizeContextProvider = ({ children }) => {
  const [windowSizes, setWindowSizes] = useState({ width: null, height: null })
  const getSize = () => {
    const win = window
    const doc = document
    const docElem = doc.documentElement
    const body = doc.getElementsByTagName('body')[0]
    const windowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth
    const windowHeight = win.innerHeight || docElem.clientHeight || body.clientHeight
    const mobile = false
    const screenModeClass = mobile ? 'mobile' : 'desktop'

    setWindowSizes({
      width: windowWidth,
      height: windowHeight,
      mobile: windowWidth <= 500,
      tablet: windowWidth <= 1180,
      desktop: windowWidth >= 1181,
      tabletLarge: windowWidth <= 1366,
      desktopSmall: windowWidth <= 1920,
      screenModeClass,
    })
  }

  const throttledgetSize = throttle(getSize, 150)

  useEffect(() => {
    getSize()
    window.addEventListener('resize', throttledgetSize)
    // window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('resize', throttledgetSize)
    }
  }, [])
  return (
    <ScreenModeAndSizeContext.Provider value={windowSizes}>
      {children}
    </ScreenModeAndSizeContext.Provider>
  )
}

export default ScreenModeAndSizeContextProvider
