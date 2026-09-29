'use client'

import { useMemo } from 'react'

import { useLocale } from 'next-intl'

import { useIsMobileViewport } from './useIsMobileViewport'

const BASE = 'protezPage/titles'
const MOBILE_BREAKPOINT_PX = 800

type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile: TitleVariant }

export type ProtezTitleName = 'prosthetic-centers'

type Dimensions = { width: number; height: number }
type Entry = {
  alt: { en: string; uk: string }
  desktop: { en: Dimensions; uk: Dimensions }
  mobile: { en: Dimensions; uk: Dimensions }
}

const TITLES: Record<ProtezTitleName, Entry> = {
  'prosthetic-centers': {
    alt: { en: 'Prosthetic centers', uk: 'Протезні Центри' },
    desktop: { en: { width: 410, height: 149 }, uk: { width: 416, height: 161 } },
    mobile: { en: { width: 237, height: 92 }, uk: { width: 241, height: 99 } },
  },
}

export function useProtezTitle(name: ProtezTitleName): TitleSpec {
  const locale = useLocale()
  const langKey: 'en' | 'uk' = locale === 'uk' ? 'uk' : 'en'
  const isMobile = useIsMobileViewport(MOBILE_BREAKPOINT_PX)

  return useMemo(() => {
    const entry = TITLES[name]

    const desktopVariant: TitleVariant = {
      src: `${BASE}/${name}_${langKey}.svg`,
      alt: entry.alt[langKey],
      width: entry.desktop[langKey].width,
      height: entry.desktop[langKey].height,
    }

    const mobileVariant: TitleVariant = {
      src: `${BASE}/${name}_mobile_${langKey}.svg`,
      alt: entry.alt[langKey],
      width: entry.mobile[langKey].width,
      height: entry.mobile[langKey].height,
    }

    return {
      desktop: isMobile ? mobileVariant : desktopVariant,
      mobile: mobileVariant,
    }
  }, [name, langKey, isMobile])
}
