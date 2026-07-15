import type { Metadata } from 'next'

import type { Locale } from '@/lib/i18n'

export const SITE_URL = 'https://www.protezfoundation.org'

export function localeUrl(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path

  return locale === 'uk' ? `${SITE_URL}/ua${clean}` : `${SITE_URL}${clean}`
}

export function buildAlternates(locale: Locale, path: string): Metadata['alternates'] {
  const clean = path === '/' ? '' : path
  const canonical = locale === 'uk' ? `/ua${clean}` || '/ua' : path

  return {
    canonical,
    languages: {
      en: localeUrl('en', path),
      'uk-UA': localeUrl('uk', path),
      'x-default': localeUrl('en', path),
    },
  }
}
