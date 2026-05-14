'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const BASE = 'academyPage/titles'

type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile?: TitleVariant }

type TitleEntry = {
  desktop: { base: string; alt: string; width: number; height: number }
  mobile?: { base: string; alt: string; width: number; height: number }
}

const TITLES = {
  intro: {
    desktop: { base: 'welcome', alt: 'About PROTEZ Academy', width: 559, height: 234 },
  },
  missionAndValues: {
    desktop: { base: 'mission-and-values', alt: 'Mission and values', width: 455, height: 161 },
    mobile: {
      base: 'mission-and-values_mobile',
      alt: 'Mission and values',
      width: 263,
      height: 99,
    },
  },
  goals: {
    desktop: { base: 'our-goals', alt: 'Our goals', width: 350, height: 161 },
    mobile: { base: 'our-goals_mobile', alt: 'Our goals', width: 202, height: 99 },
  },
  academy: {
    desktop: { base: 'protez-academy', alt: 'Protez Academy', width: 458, height: 141 },
  },
  ourResults: {
    desktop: { base: 'our-results', alt: 'Our results', width: 387, height: 142 },
  },
  chief: {
    desktop: { base: 'yakov-gradinar', alt: 'Yakov Gradinar', width: 608, height: 149 },
    mobile: { base: 'yakov-gradinar_mobile', alt: 'Yakov Gradinar', width: 281, height: 93 },
  },
  events: {
    desktop: {
      base: 'current-training-programs',
      alt: 'Current training programs',
      width: 920,
      height: 150,
    },
    mobile: {
      base: 'current-training-programs_mobile',
      alt: 'Current training programs',
      width: 281,
      height: 143,
    },
  },
  academyStudents: {
    desktop: { base: 'academy-students', alt: 'Academy students', width: 491, height: 150 },
  },
  summitResults: {
    desktop: { base: 'summit-results', alt: 'Summit results', width: 394, height: 147 },
    mobile: { base: 'summit-results_mobile', alt: 'Summit results', width: 385, height: 147 },
  },
  specialThanksToAllOurPartners: {
    desktop: {
      base: 'special-thanks-to-all-our-partners',
      alt: 'Special thanks to all our partners',
      width: 705,
      height: 218,
    },
    mobile: {
      base: 'special-thanks-to-all-our-partners_mobile',
      alt: 'Special thanks to all our partners',
      width: 277,
      height: 189,
    },
  },
  ourSponsors: {
    desktop: { base: 'our-sponsors', alt: 'Our sponsors', width: 522, height: 147 },
    mobile: { base: 'our-sponsors_mobile', alt: 'Our sponsors', width: 302, height: 91 },
  },
  ourTeachers: {
    desktop: { base: 'we-train', alt: 'We train', width: 482, height: 149 },
  },
  footer: {
    desktop: { base: 'footer', alt: 'PROTEZ Academy', width: 635, height: 165 },
    mobile: { base: 'footer_mobile', alt: 'PROTEZ Academy', width: 325, height: 92 },
  },
} as const satisfies Record<string, TitleEntry>

const LANG_SUFFIX = {
  [Languages.Ukrainian]: 'uk',
  [Languages.English]: 'en',
} as const

export type AcademyTitleName = keyof typeof TITLES

export function useAcademyTitle(name: AcademyTitleName): TitleSpec {
  const { lang } = useLanguage()
  const suffix = LANG_SUFFIX[lang]
  const spec = TITLES[name]
  const buildSrc = (base: string) => `${BASE}/${base}_${suffix}.svg`
  const mobile = 'mobile' in spec ? spec.mobile : undefined

  return {
    desktop: { ...spec.desktop, src: buildSrc(spec.desktop.base) },
    ...(mobile && {
      mobile: { ...mobile, src: buildSrc(mobile.base) },
    }),
  }
}
