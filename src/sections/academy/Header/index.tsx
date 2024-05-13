'use client'

import { Fragment, useState, useCallback } from 'react'

import { Languages } from '@/types'
import texts from '@/texts&svg'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from '@/sections/Header/components/BurgerButton'
import { icons } from '@/sections/Header/icons'

import style from './style.module.scss'

const AcademyHeader = () => {
  const [headerIsOpened, setHeaderIsOpened] = useState(false)

  const { width, mobile } = useScreenModeAndSize()

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const { lang, setLang } = useLanguage()

  const handleLanguageChange = useCallback(() => {
    const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

    setLang(langToSet)
    localStorage.setItem('lang', langToSet)
  }, [lang, setLang])

  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened)
  }

  const isMobile = mobile || width < 768

  return (
    <Fragment>
      <header className={style.academyHeader}>
        <a href="#academyIntro">{icons.protezAcademyLogo()}</a>
        {width < 992 ? (
          <BurgerButton
            isBlack={false}
            color="blue"
            onClick={toggleHeader}
            close={headerIsOpened}
          />
        ) : (
          <div className={style.btnGroup}>
            <Button
              as="link"
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target={'_blank'}
              variant="primary-blue"
              size="small"
              rel="noopener noreferrer"
              className={style.applyBtn}
            >
              {texts.academyHeader.buttons.applyToAcademy[lang]}
            </Button>
            <Button as="link" href="/" variant="secondary-white" size="small">
              {texts.academyHeader.buttons.foundation[lang]}
            </Button>
            <div className={style.languageWrapper}>
              {icons.iconWorld(`${style.worldIcon}`)}
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.English}
                className={style.localeBtn}
              >
                EN
              </button>
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.Ukrainian}
                className={style.localeBtn}
              >
                UA
              </button>
            </div>
            <BurgerButton
              isBlack={false}
              color="blue"
              onClick={toggleHeader}
              close={headerIsOpened}
            />
          </div>
        )}
        <nav ref={ref} className={`${style.headerNav} ${headerIsOpened ? style.opened : ''}`}>
          test
        </nav>
      </header>
      {!isMobile && <SocialMediaLinks color="blue" className={headerIsOpened ? ' hidden' : ''} />}
    </Fragment>
  )
}

export default AcademyHeader
