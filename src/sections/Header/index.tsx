'use client'
import { useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { icons } from './icons'
import texts from '@/texts&svg'
import SquareButton from '@/components/SquareButton'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import { usePageSettings } from '@/contexts/PageSettingsContext'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Divider from '@/components/Divider'
import Link from 'next/link'

import style from './style.module.scss'

import { BurgerButton } from './components/BurgerButton'

const Header = ({ notMainPage }: { notMainPage?: boolean }) => {
  const { lang, setLang } = useLanguage()
  const { isBackgroundWhite, disabledSections } = usePageSettings()

  const { width, mobile } = useScreenModeAndSize()
  const [headerIsOpened, setHeaderIsOpened] = useState(false)

  const handleLanguageChange = useCallback(() => {
    const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

    setLang(langToSet)
    localStorage.setItem('lang', langToSet)
  }, [lang, setLang])

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const navLinks = Object.keys(texts.header.navigation)
    .filter(key => !disabledSections.includes(key))
    .map(el => texts.header.navigation[el as keyof typeof texts.header.navigation])
  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened)
  }

  const isHeaderBlack = notMainPage || isBackgroundWhite || (width <= 750 && headerIsOpened)

  return (
    <>
      <header
        className={`${style.header} ${notMainPage && style.notMainPage} ${isHeaderBlack && style.black}`}
        id="header"
      >
        {notMainPage ? (
          <Link href={'/'}>
            {icons.protezFoundationLogo(`${style.foundationLogo} ${mobile && style.small}`)}
          </Link>
        ) : (
          <a href={'#letsGiveHope'}>
            {icons.protezFoundationLogo(`${style.foundationLogo} ${mobile && style.small}`)}
          </a>
        )}
        {mobile ? (
          <BurgerButton isBlack={isHeaderBlack} onClick={toggleHeader} close={headerIsOpened} />
        ) : (
          <div className={`${style.headerActionLang} ${headerIsOpened && style.transparent}`}>
            <a
              // href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              href="/academy"
              target="blank"
              className={`${style.protezAcademy}`}
            >
              {texts.header.actionButtons.protezAcademy[lang]}
            </a>
            <Divider vertical />
            <button
              className={`${style.languageButton} ${style.upper}`}
              onClick={handleLanguageChange}
            >
              {icons.iconWorld(style.languageButtonIcon)}
              <span className={`h6 ${style.languageButtonText}`}>{lang}</span>
            </button>
            <Divider vertical />
            <BurgerButton isBlack={isHeaderBlack} onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}
        <nav ref={ref} className={`${style.headerNav} ${headerIsOpened ? style.opened : ''}`}>
          <div>
            <span className={style.menuText}>{texts.header.menu[lang]}</span>
            <ul className={style.ancorList}>
              {navLinks.map((link, index) => (
                <li key={index} className={'h5'}>
                  {notMainPage ? (
                    <Link className={style.navAncor} href="/" onClick={toggleHeader}>
                      {link[lang]}
                    </Link>
                  ) : (
                    <a className={style.navAncor} href={`#${link.id}`} onClick={toggleHeader}>
                      {link[lang]}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.navLowerPart}>
            <div className={style.navLowerPartButtonsContainer}>
              <SquareButton link href="donate" pink>
                {texts.header.actionButtons.makeDonation[lang]}
              </SquareButton>

              <SquareButton
                link
                blank
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                black
                className={style.protezAcademyMenuButton}
              >
                {texts.header.actionButtons.protezAcademy[lang]}
              </SquareButton>
            </div>
            <Divider className={style.headerDivider} />
            <span className={style.menuText}>{texts.header.getInTouch[lang]}</span>
            <div className={style.socialMediaLinks}>
              {texts.socialMediaLinks.map((link, index) => (
                <a key={index} href={link.address} className={style.socialMediaLink} target="blank">
                  {link.icon(style.socialMediaIcon)}
                </a>
              ))}
            </div>
            <a className={`${style.phoneNumber} h6`} href="tel:+16127724777">
              +1 612-772-4777
            </a>
          </div>
          <div className={style.languageButtonContainer}>
            <button className={style.languageButton} onClick={handleLanguageChange}>
              {icons.iconWorld(style.languageButtonIcon)}{' '}
              <span className={`h6 ${style.languageButtonText}`}>{lang}</span>
            </button>
          </div>
        </nav>
      </header>
      <SocialMediaLinks className={headerIsOpened ? ' hidden' : ''} />
    </>
  )
}

export default Header
