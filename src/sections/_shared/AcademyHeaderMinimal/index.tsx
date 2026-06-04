'use client'

import { useTransition } from 'react'

import Link from 'next/link'

import { useLocale } from 'next-intl'
import { persistLocaleChoice, usePathname, useRouter } from '@/lib/i18n'

import SocialMediaLinks from '@/components/SocialMediaLinks'

import styles from './styles.module.scss'

import { icons } from './icons'

const TermsConditionsHeader = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const switchLocale = (next: 'en' | 'uk') => {
    if (next === locale) return
    persistLocaleChoice(next)
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <>
      <header className={styles.academyHeader}>
        <Link href="/academy">{icons.protezAcademyLogo()}</Link>

        <div className={styles.btnGroup}>
          <div className={styles.languageWrapper}>
            {icons.iconWorld(`${styles.worldIcon}`)}
            <button
              onClick={() => switchLocale('en')}
              disabled={locale === 'en'}
              className={styles.localeBtn}
            >
              EN
            </button>
            <button
              onClick={() => switchLocale('uk')}
              disabled={locale === 'uk'}
              className={styles.localeBtn}
            >
              UA
            </button>
          </div>
        </div>
      </header>
      <SocialMediaLinks color="blue" className={styles.desktopSocialMedia} />
    </>
  )
}

export default TermsConditionsHeader
