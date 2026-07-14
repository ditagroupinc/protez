'use client'

import { useEffect, useState } from 'react'

export function useIsMobileViewport(breakpointPx: number): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx}px)`)
    const sync = () => setIsMobile(mql.matches)

    sync()
    mql.addEventListener('change', sync)

    return () => mql.removeEventListener('change', sync)
  }, [breakpointPx])

  return isMobile
}
