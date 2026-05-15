'use client'

import ukMessages from '../../messages/academy-about.uk.json'
import enMessages from '../../messages/academy-about.en.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type AcademyAboutTexts = typeof ukMessages

export function useAcademyAboutTexts(): AcademyAboutTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
