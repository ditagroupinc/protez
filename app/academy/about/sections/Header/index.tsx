'use client'

import { useCallback } from 'react'

import Link from 'next/link'

import { Languages } from '@/types'

import { useLanguage } from '@/contexts/LanguageContext'

import SocialMediaLinks from '@academy/components/SocialMediaLinks'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import styles from './styles.module.scss'

import { icons } from './icons'

const TermsConditionsHeader = () => {
  const { width } = useScreenModeAndSize()

  const { lang, setLang } = useLanguage()

  const handleLanguageChange = useCallback(() => {
    const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

    setLang(langToSet)
    localStorage.setItem('lang', langToSet)
  }, [lang, setLang])

  const isMobile = width < 768

  return (
    <>
      <header className={styles.academyHeader}>
        <Link href="/academy">{icons.protezAcademyLogo()}</Link>

        <div className={styles.btnGroup}>
          <div className={styles.languageWrapper}>
            {icons.iconWorld(`${styles.worldIcon}`)}
            <button
              onClick={handleLanguageChange}
              disabled={lang === Languages.English}
              className={styles.localeBtn}
            >
              EN
            </button>
            <button
              onClick={handleLanguageChange}
              disabled={lang === Languages.Ukrainian}
              className={styles.localeBtn}
            >
              UA
            </button>
          </div>
        </div>
      </header>
      {!isMobile && <SocialMediaLinks color="blue" />}
    </>
  )
}

export default TermsConditionsHeader
