'use client'

import { useEffect, useMemo, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

import { ACADEMY_TITLES, type AcademyTitleName } from './academyTitles.generated'

export type { AcademyTitleName } from './academyTitles.generated'

const BASE = 'academyPage/titles'
const MOBILE_BREAKPOINT_PX = 800

type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile: TitleVariant }

const LANG_SUFFIX = {
  [Languages.Ukrainian]: 'uk',
  [Languages.English]: 'en',
} as const

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
  const { lang } = useLanguage()
  const langKey = LANG_SUFFIX[lang]
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

    // `desktop` carries the *active* variant so existing consumers (who read
    // only `desktop`) automatically pick up the mobile asset on small viewports.
    return {
      desktop: isMobile ? mobileVariant : desktopVariant,
      mobile: mobileVariant,
    }
  }, [name, langKey, isMobile])
}
