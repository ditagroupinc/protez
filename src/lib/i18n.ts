import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localeDetection: false,
  localeCookie: false,
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      uk: '/ua',
    },
  },
})

export type Locale = (typeof routing.locales)[number]

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function persistLocaleChoice(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`
}

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
