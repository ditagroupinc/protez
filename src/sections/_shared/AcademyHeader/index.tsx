'use client'

import { useState, useEffect, useCallback } from 'react'

import { Languages } from '@/types'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/AcademyButton'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from '@/components/BurgerButton'

import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import styles from './styles.module.scss'

import { AcademyIDs } from '@academy/consts'
import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '@academy/consts/links'

import Link from 'next/link'

import { icons } from './icons'

const AncorLinkIds = [
  AcademyIDs.Intro,
  AcademyIDs.MissionAndValues,
  AcademyIDs.OurGoals,
  AcademyIDs.Academy,
  AcademyIDs.OurResults,
  AcademyIDs.Chief,
  AcademyIDs.PastAndUpcomingEvents,
  AcademyIDs.AcademyStudents,
  AcademyIDs.SummitResults,
  AcademyIDs.SpecialThanksToAllOurPartners,
  AcademyIDs.OurSponsors,
] as const

const AcademyHeader = () => {
  const [headerIsOpened, setHeaderIsOpened] = useState(false)

  const { width } = useScreenModeAndSize()

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const t = useAcademyTexts()

  const { lang, setLang } = useLanguage()

  const handleLanguageChange = useCallback(() => {
    const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

    setLang(langToSet)
    localStorage.setItem('lang', langToSet)
  }, [lang, setLang])

  const isMobile = width < 768

  useEffect(() => {
    if (headerIsOpened && isMobile) {
      document.body.classList.add('no-scroll')
      document.documentElement.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
      document.documentElement.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
      document.documentElement.classList.remove('no-scroll')
    }
  }, [headerIsOpened])

  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened)
  }

  const closeHeaderOnAncorClick = () => {
    if (isMobile) setHeaderIsOpened(false)
  }

  return (
    <>
      <header className={styles.academyHeader}>
        <a href="#academyIntro">{icons.protezAcademyLogo()}</a>
        {width < 992 ? (
          <BurgerButton
            isBlack={false}
            color="blue"
            onClick={toggleHeader}
            close={headerIsOpened}
          />
        ) : (
          <div className={styles.btnGroup}>
            <Button
              as="link"
              href={ACADEMY_APPLY_FORM_URL}
              target={'_blank'}
              variant="primary-blue"
              size="small"
              rel="noopener noreferrer"
              className={styles.applyBtn}
            >
              {/* {texts.academyHeader.buttons.applyToAcademy[lang]} */}
              {t.cta.apply}
            </Button>
            <Button as="link" href="/" variant="secondary-white" size="small">
              {/* {texts.academyHeader.buttons.foundation[lang]} */}
              {t.header.cta.foundation}
            </Button>
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
            <BurgerButton
              isBlack={false}
              color="blue"
              onClick={toggleHeader}
              close={headerIsOpened}
            />
          </div>
        )}
        <div className={`${styles.sideMenu} ${headerIsOpened ? styles.opened : ''}`}>
          <div className={styles.protezFoundationLinkWrapper}>
            <Link href={'/'} className={styles.protezFoundationLink}>
              <span>{t.header.cta.foundation}</span>
              {icons.arrowUp(styles.icon)}
            </Link>
          </div>
          <div className={styles.navigationWrapper}>
            <nav ref={ref} className={styles.navigation}>
              <ul className={styles.ancorList}>
                {AncorLinkIds.map(id => (
                  <li key={id} className={styles.ancorItem} onClick={closeHeaderOnAncorClick}>
                    <a href={`#${id}`} className={styles.ancorLink}>
                      {t.header.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.lowerPart}>
            <div className={styles.lowerPartButtonsContainer}>
              <Button
                as="link"
                href={ACADEMY_APPLY_FORM_URL}
                target={'_blank'}
                variant="primary-blue"
                size="small"
                rel="noopener noreferrer"
                className={styles.lowerPartButton}
              >
                {t.cta.apply}
                {/* {texts.academyHeader.buttons.applyToAcademy[lang]} */}
              </Button>
              <Button
                as="link"
                href={DONATE_URL}
                variant="secondary-black"
                size="small"
                className={styles.lowerPartButton}
              >
                {t.cta.support}
                {/* {texts.academyHeader.buttons.supportAcademy[lang]} */}
                {icons.arrowUp(`${styles.icon} ${styles.black}`)}
              </Button>
            </div>

            <a className={styles.phoneNumber} href="tel:+16127724777">
              {icons.call(styles.icon)}
              <span> {t.header.phone}</span>
            </a>

            <div className={styles.languageButtonContainer}>
              <button className={styles.languageButton} onClick={handleLanguageChange}>
                {icons.iconWorld(styles.icon)}
                <span>{t.header.cta.language}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {!isMobile && <SocialMediaLinks color="blue" className={headerIsOpened ? ' hidden' : ''} />}
    </>
  )
}

export default AcademyHeader
