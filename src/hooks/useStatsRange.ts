'use client'

import { useTranslations } from 'next-intl'

import type { CurrentMonth } from '@/lib/date'

type Variant = 'range' | 'rangeNote'

export const useStatsRange = ({ monthIndex, year }: CurrentMonth, variant: Variant = 'range') => {
  const t = useTranslations('shared.stats')
  const months = t.raw('months') as string[]

  return t(variant, { month: months[monthIndex], year: String(year) })
}
