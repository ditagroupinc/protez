'use client'

import { useMemo } from 'react'

import { useLocale, useTranslations } from 'next-intl'

type TitleSpec = { src: string; width: number; height: number; alt: string }

const BASE = 'donatePage/titles'

const DIMENSIONS = {
  en: { src: `${BASE}/donate-title_en.svg`, width: 902, height: 170 },
  uk: { src: `${BASE}/donate-title_uk.svg`, width: 864, height: 164 },
} as const

export function useDonateTitle(): TitleSpec {
  const locale = useLocale()
  const t = useTranslations('donate')
  const key: 'en' | 'uk' = locale === 'uk' ? 'uk' : 'en'
  const titleAlt = t('titleAlt')

  return useMemo(() => ({ ...DIMENSIONS[key], alt: titleAlt }), [key, titleAlt])
}
