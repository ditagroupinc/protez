'use client'

import { useMemo } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

import { useDonationsTexts } from './useDonationsTexts'

type TitleSpec = { src: string; width: number; height: number; alt: string }

const BASE = 'donatePage/titles'

const DIMENSIONS = {
  [Languages.English]: { src: `${BASE}/donate-title_en.svg`, width: 902, height: 170 },
  [Languages.Ukrainian]: { src: `${BASE}/donate-title_uk.svg`, width: 864, height: 164 },
} as const

export function useDonateTitle(): TitleSpec {
  const { lang } = useLanguage()
  const t = useDonationsTexts()

  return useMemo(() => ({ ...DIMENSIONS[lang], alt: t.titleAlt }), [lang, t.titleAlt])
}
