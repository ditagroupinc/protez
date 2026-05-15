'use client'

import { useEffect, useMemo, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const BASE = 'academyPage/titles'
const MOBILE_BREAKPOINT_PX = 800

type Dim = { width: number; height: number }
type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile?: TitleVariant }

type TitleEntry = {
  desktop: { base: string; alt: string; en: Dim; uk: Dim }
  mobile?: { base?: string; alt?: string; en: Dim; uk: Dim }
}

const TITLES = {
  intro: {
    desktop: {
      base: 'welcome',
      alt: 'About PROTEZ Academy',
      en: { width: 584, height: 234 },
      uk: { width: 554, height: 234 },
    },
  },
  missionAndValues: {
    desktop: {
      base: 'mission-and-values',
      alt: 'Mission and values',
      en: { width: 495, height: 149 },
      uk: { width: 455, height: 161 },
    },
  },
  goals: {
    desktop: {
      base: 'our-goals',
      alt: 'Our goals',
      en: { width: 313, height: 160 },
      uk: { width: 356, height: 167 },
    },
  },
  academy: {
    desktop: {
      base: 'protez-academy',
      alt: 'Protez Academy',
      en: { width: 458, height: 141 },
      uk: { width: 458, height: 141 },
    },
  },
  ourResults: {
    desktop: {
      base: 'our-results',
      alt: 'Our results',
      en: { width: 387, height: 142 },
      uk: { width: 581, height: 147 },
    },
  },
  chief: {
    desktop: {
      base: 'yakov-gradinar',
      alt: 'Yakov Gradinar',
      en: { width: 607, height: 149 },
      uk: { width: 598, height: 156 },
    },
  },
  events: {
    desktop: {
      base: 'current-training-programs',
      alt: 'Current training programs',
      en: { width: 990, height: 142 },
      uk: { width: 523, height: 146 },
    },
  },
  academyStudents: {
    desktop: {
      base: 'academy-students',
      alt: 'Academy students',
      en: { width: 491, height: 149 },
      uk: { width: 458, height: 148 },
    },
  },
  summitResults: {
    desktop: {
      base: 'summit-results',
      alt: 'Summit results',
      en: { width: 397, height: 236 },
      uk: { width: 535, height: 236 },
    },
    mobile: {
      en: { width: 329, height: 160 },
      uk: { width: 330, height: 160 },
    },
  },
  specialThanksToAllOurPartners: {
    desktop: {
      base: 'special-thanks-to-all-our-partners',
      alt: 'Special thanks to all our partners',
      en: { width: 705, height: 218 },
      uk: { width: 870, height: 216 },
    },
  },
  ourSponsors: {
    desktop: {
      base: 'our-sponsors',
      alt: 'Our sponsors',
      en: { width: 500, height: 142 },
      uk: { width: 522, height: 147 },
    },
  },
  ourTeachers: {
    desktop: {
      base: 'we-train',
      alt: 'We train',
      en: { width: 274, height: 140 },
      uk: { width: 542, height: 141 },
    },
  },
  amputeeRehab: {
    desktop: {
      base: 'summit',
      alt: 'Summit',
      en: { width: 571, height: 193 },
      uk: { width: 571, height: 193 },
    },
  },
  footer: {
    desktop: {
      base: 'footer',
      alt: 'PROTEZ Academy',
      en: { width: 635, height: 165 },
      uk: { width: 635, height: 165 },
    },
    mobile: {
      en: { width: 325, height: 92 },
      uk: { width: 325, height: 92 },
    },
  },
} as const satisfies Record<string, TitleEntry>

const LANG_SUFFIX = {
  [Languages.Ukrainian]: 'uk',
  [Languages.English]: 'en',
} as const

export type AcademyTitleName = keyof typeof TITLES

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
    const spec: TitleEntry = TITLES[name]
    const buildSrc = (base: string) => `${BASE}/${base}_${langKey}.svg`

    const desktopVariant: TitleVariant = {
      src: buildSrc(spec.desktop.base),
      alt: spec.desktop.alt,
      width: spec.desktop[langKey].width,
      height: spec.desktop[langKey].height,
    }

    const mobileVariant: TitleVariant | undefined = spec.mobile
      ? {
          src: buildSrc(spec.mobile.base ?? `${spec.desktop.base}_mobile`),
          alt: spec.mobile.alt ?? spec.desktop.alt,
          width: spec.mobile[langKey].width,
          height: spec.mobile[langKey].height,
        }
      : undefined

    // `desktop` carries the *active* variant so existing consumers (who read only
    // `desktop`) automatically pick up the mobile asset on small viewports.
    return {
      desktop: isMobile && mobileVariant ? mobileVariant : desktopVariant,
      mobile: mobileVariant,
    }
  }, [name, langKey, isMobile])
}
