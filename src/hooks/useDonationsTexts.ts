'use client'

import enMessages from '../../messages/donations.en.json'
import ukMessages from '../../messages/donations.uk.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type DonationsTexts = typeof enMessages

export function useDonationsTexts(): DonationsTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
