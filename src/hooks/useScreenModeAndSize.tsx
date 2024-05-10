'use client'

import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'

const useScreenModeAndSize = () => {
  const { width, height } = useWindowSize()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getScreenMode = (width: number) => {
    if (width <= 500) return 'mobile'
    if (width <= 1180) return 'tablet'
    if (width <= 1366) return 'tabletLarge'
    if (width <= 1920) return 'desktopSmall'

    return 'desktop'
  }

  const effectiveWidth = isClient ? width : 1024
  const screenModeClass = getScreenMode(effectiveWidth)

  const mobile = screenModeClass === 'mobile'
  const tablet = screenModeClass === 'tablet'
  const tabletLarge = screenModeClass === 'tabletLarge'
  const desktopSmall = screenModeClass === 'desktopSmall'
  const desktop = screenModeClass === 'desktop'

  return {
    width: effectiveWidth,
    height,
    mobile,
    tablet,
    tabletLarge,
    desktopSmall,
    desktop,
    screenModeClass,
  }
}

export default useScreenModeAndSize
