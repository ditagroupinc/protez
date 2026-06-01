'use client'

import enMessages from '../../messages/home.en.json'
import ukMessages from '../../messages/home.uk.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type HomeTexts = typeof enMessages

export function useHomeTexts(): HomeTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
