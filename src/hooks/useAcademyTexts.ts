'use client'

import ukMessages from '../../messages/uk.json'
import enMessages from '../../messages/en.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type AcademyTexts = typeof ukMessages.academy

export function useAcademyTexts(): AcademyTexts {
  const { lang } = useLanguage()

  return dictionaries[lang].academy
}
