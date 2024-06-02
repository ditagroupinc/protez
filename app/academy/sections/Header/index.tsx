'use client'

import { useState, useEffect } from 'react'

import { Languages } from '@/types'
import texts from '@/texts&svg'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from '@/sections/Header/components/BurgerButton'

import styles from './styles.module.scss'

import { AcademyIDs } from '../../consts'

import Link from 'next/link'

import { icons } from './icons'

const AncorLinks = [
  { id: AcademyIDs.Intro, text: 'Home' },
  { id: AcademyIDs.OurGoals, text: 'Our Goals' },
  { id: AcademyIDs.Academy, text: 'Academy' },
  { id: AcademyIDs.OurResults, text: 'Our Results' },
  { id: AcademyIDs.OurTeachers, text: 'Academy Teachers' },
  { id: AcademyIDs.Chief, text: 'Chief' },
  { id: AcademyIDs.TheoryLectures, text: 'Theory Lectures' },
  { id: AcademyIDs.PracticeSessions, text: 'Practice Sessions' },
  { id: AcademyIDs.PastAndUpcomingEvents, text: 'Events' },
  { id: AcademyIDs.AcademyStudents, text: 'Students' },
  { id: AcademyIDs.AmputeeRehab, text: 'Amputee Rehab' },
  { id: AcademyIDs.SummitResults, text: 'Summit' },
  { id: AcademyIDs.WeAreInNews, text: 'We Are In News' },
  { id: AcademyIDs.SpecialThanksToAllOurPartners, text: 'Partners' },
]

const AcademyHeader = () => {
  const [headerIsOpened, setHeaderIsOpened] = useState(false)

  const { width } = useScreenModeAndSize()

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const { lang } = useLanguage()

  // const handleLanguageChange = useCallback(() => {
  //   const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

  //   setLang(langToSet)
  //   localStorage.setItem('lang', langToSet)
  // }, [lang, setLang])

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
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target={'_blank'}
              variant="primary-blue"
              size="small"
              rel="noopener noreferrer"
              className={styles.applyBtn}
            >
              {texts.academyHeader.buttons.applyToAcademy[lang]}
            </Button>
            <Button as="link" href="/" variant="secondary-white" size="small">
              {texts.academyHeader.buttons.foundation[lang]}
            </Button>
            <div className={styles.languageWrapper}>
              {icons.iconWorld(`${styles.worldIcon}`)}
              <button
                // onClick={handleLanguageChange}
                disabled={lang === Languages.English}
                className={styles.localeBtn}
              >
                EN
              </button>
              <button
                // onClick={handleLanguageChange}
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
              <span>Protez Foundation</span>
              {icons.arrowUp(styles.icon)}
            </Link>
          </div>
          <div className={styles.navigationWrapper}>
            <nav ref={ref} className={styles.navigation}>
              <ul className={styles.ancorList}>
                {AncorLinks.map(({ id, text }) => (
                  <li key={id} className={styles.ancorItem} onClick={closeHeaderOnAncorClick}>
                    <a href={`#${id}`} className={styles.ancorLink}>
                      {text}
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
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                target={'_blank'}
                variant="primary-blue"
                size="small"
                rel="noopener noreferrer"
                className={styles.lowerPartButton}
              >
                {texts.academyHeader.buttons.applyToAcademy[lang]}
              </Button>
              <Button
                as="link"
                href="/"
                variant="secondary-black"
                size="small"
                className={styles.lowerPartButton}
              >
                {texts.academyHeader.buttons.supportAcademy[lang]}
                {icons.arrowUp(`${styles.icon} ${styles.black}`)}
              </Button>
            </div>

            <a className={styles.phoneNumber} href="tel:+16127724777">
              {icons.call(styles.icon)}
              <span> +1 612-772-4777</span>
            </a>

            <div className={styles.languageButtonContainer}>
              <button className={styles.languageButton}>
                {icons.iconWorld(styles.icon)}
                <span>English</span>
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
