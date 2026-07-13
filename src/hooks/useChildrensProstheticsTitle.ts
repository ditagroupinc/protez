'use client'

import { useEffect, useMemo, useState } from 'react'

import { useLocale } from 'next-intl'

const BASE = 'dytyacheProtezuvannyaPage/titles'
const MOBILE_BREAKPOINT_PX = 800

type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile: TitleVariant }

export type ChildrensProstheticsTitleName =
  | 'childrens-prosthetics'
  | 'childrens-prosthetics-dark'
  | 'childrens-stories'
  | 'name-marijka'
  | 'name-oskar'
  | 'name-taya'

type Entry = {
  alt: { en: string; uk: string }
  desktop: { width: number; height: number }
  mobile: { width: number; height: number }
}

const TITLES: Record<ChildrensProstheticsTitleName, Entry> = {
  'childrens-prosthetics': {
    alt: { en: "Children's Prosthetics", uk: 'Дитяче протезування' },
    desktop: { width: 620, height: 160 },
    mobile: { width: 420, height: 130 },
  },
  'childrens-prosthetics-dark': {
    alt: { en: "Children's Prosthetics", uk: 'Дитяче протезування' },
    desktop: { width: 620, height: 160 },
    mobile: { width: 420, height: 130 },
  },
  'childrens-stories': {
    alt: { en: "Children's Stories", uk: 'Історії дітей' },
    desktop: { width: 620, height: 100 },
    mobile: { width: 440, height: 80 },
  },
  'name-marijka': {
    alt: { en: 'Mariia', uk: 'Марійка' },
    desktop: { width: 360, height: 70 },
    mobile: { width: 260, height: 52 },
  },
  'name-oskar': {
    alt: { en: 'Oskar', uk: 'Оскар' },
    desktop: { width: 360, height: 70 },
    mobile: { width: 260, height: 52 },
  },
  'name-taya': {
    alt: { en: 'Taya', uk: 'Тая' },
    desktop: { width: 360, height: 70 },
    mobile: { width: 260, height: 52 },
  },
}

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

export function useChildrensProstheticsTitle(name: ChildrensProstheticsTitleName): TitleSpec {
  const locale = useLocale()
  const langKey: 'en' | 'uk' = locale === 'uk' ? 'uk' : 'en'
  const isMobile = useIsMobileViewport(MOBILE_BREAKPOINT_PX)

  return useMemo(() => {
    const entry = TITLES[name]

    const desktopVariant: TitleVariant = {
      src: `${BASE}/${name}_${langKey}.svg`,
      alt: entry.alt[langKey],
      width: entry.desktop.width,
      height: entry.desktop.height,
    }

    const mobileVariant: TitleVariant = {
      src: `${BASE}/${name}_mobile_${langKey}.svg`,
      alt: entry.alt[langKey],
      width: entry.mobile.width,
      height: entry.mobile.height,
    }

    return {
      desktop: isMobile ? mobileVariant : desktopVariant,
      mobile: mobileVariant,
    }
  }, [name, langKey, isMobile])
}
