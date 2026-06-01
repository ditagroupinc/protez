'use client'

import enMessages from '../../messages/stories.en.json'
import ukMessages from '../../messages/stories.uk.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type StoriesTexts = typeof enMessages

export function useStoriesTexts(): StoriesTexts {
  const { lang } = useLanguage()

  return dictionaries[lang]
}
