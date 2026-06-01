'use client'

import enMessages from '../../messages/shared.en.json'
import ukMessages from '../../messages/shared.uk.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type SharedTexts = typeof enMessages

export function useSharedTexts(): SharedTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
