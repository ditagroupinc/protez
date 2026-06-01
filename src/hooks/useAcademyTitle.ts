'use client'

import { useEffect, useMemo, useState } from 'react'

import { useLocale } from 'next-intl'

import { ACADEMY_TITLES, type AcademyTitleName } from './academyTitles.generated'

export type { AcademyTitleName } from './academyTitles.generated'

const BASE = 'academyPage/titles'
const MOBILE_BREAKPOINT_PX = 800

type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile: TitleVariant }

function useIsMobileViewport(breakpointPx: number): boolean {
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

export function useAcademyTitle(name: AcademyTitleName): TitleSpec {
  const locale = useLocale()
  const langKey: 'en' | 'uk' = locale === 'uk' ? 'uk' : 'en'
  const isMobile = useIsMobileViewport(MOBILE_BREAKPOINT_PX)

  return useMemo(() => {
    const entry = ACADEMY_TITLES[name]

    const desktopVariant: TitleVariant = {
      src: `${BASE}/${name}_${langKey}.svg`,
      alt: entry.alt,
      width: entry.desktop[langKey].width,
      height: entry.desktop[langKey].height,
    }

    const mobileVariant: TitleVariant = {
      src: `${BASE}/${name}_mobile_${langKey}.svg`,
      alt: entry.alt,
      width: entry.mobile[langKey].width,
      height: entry.mobile[langKey].height,
    }

    return {
      desktop: isMobile ? mobileVariant : desktopVariant,
      mobile: mobileVariant,
    }
  }, [name, langKey, isMobile])
}
