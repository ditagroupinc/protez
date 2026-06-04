'use client'

import { useEffect, useState, useTransition } from 'react'
import { useLocale } from 'next-intl'

import {
  LOCALE_COOKIE_NAME,
  persistLocaleChoice,
  usePathname,
  useRouter,
  type Locale,
} from '@/lib/i18n'
import Button from '@/components/Button'
import { icons } from '@/sections/_shared/Header/icons'

import style from './style.module.scss'

const LanguageSelectionModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [, startTransition] = useTransition()

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!document.cookie.includes(`${LOCALE_COOKIE_NAME}=`)) {
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const handleChoose = (chosen: Locale) => {
    persistLocaleChoice(chosen)

    setIsOpen(false)

    if (chosen !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: chosen })
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className={style.overlay} data-lang-modal role="dialog" aria-modal="true">
      <div className={style.card}>
        {icons.protezPage.logo(style.logo)}
        <p className={style.title}>Please choose a language</p>
        <p className={style.title}>Будь ласка, оберіть мову</p>
        <div className={style.actions}>
          <Button
            as="button"
            variant="primary-black"
            size="normal"
            onClick={() => handleChoose('en')}
            className={style.choiceButton}
          >
            English
          </Button>
          <Button
            as="button"
            variant="primary-black"
            size="normal"
            onClick={() => handleChoose('uk')}
            className={style.choiceButton}
          >
            Українська
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelectionModal
