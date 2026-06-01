import { Languages } from '@/types'

export const localeToLanguage = (locale: string): Languages =>
  locale === 'uk' ? Languages.Ukrainian : Languages.English
