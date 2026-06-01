'use client'

import enMessages from '../../messages/thank-you.en.json'
import ukMessages from '../../messages/thank-you.uk.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type ThankYouTexts = typeof enMessages

export function useThankYouTexts(): ThankYouTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
