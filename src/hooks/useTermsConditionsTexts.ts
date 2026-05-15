'use client'

import ukMessages from '../../messages/termsConditions.uk.json'
import enMessages from '../../messages/termsConditions.en.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type TermsConditionsTexts = typeof ukMessages

export function useTermsConditionsTexts(): TermsConditionsTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
