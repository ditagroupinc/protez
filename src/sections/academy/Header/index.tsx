'use client'

import { useState, useEffect } from 'react'

import { Languages } from '@/types'
// import texts from '@/texts&svg'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from '@/components/BurgerButton'

import style from './style.module.scss'

import { AcademyIDs } from '../../../../app/academy/consts'

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
      <header className={style.academyHeader}>
        <a href="#academyIntro">{icons.protezAcademyLogo()}</a>
        {width < 992 ? (
          <BurgerButton color="blue" onClick={toggleHeader} close={headerIsOpened} />
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
              {/* {texts.academyHeader.buttons.applyToAcademy[lang]} */}
              Apply to Academy
            </Button>
            <Button as="link" href="/" variant="secondary-white" size="small">
              {/* {texts.academyHeader.buttons.foundation[lang]} */}
              Protez Foundation
            </Button>
            <div className={style.languageWrapper}>
              {icons.iconWorld(`${style.worldIcon}`)}
              <button
                // onClick={handleLanguageChange}
                disabled={lang === Languages.English}
                className={style.localeBtn}
              >
                EN
              </button>
              <button
                // onClick={handleLanguageChange}
                disabled={lang === Languages.Ukrainian}
                className={style.localeBtn}
              >
                UA
              </button>
            </div>
            <BurgerButton color="blue" onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}
        <div className={`${style.sideMenu} ${headerIsOpened ? style.opened : ''}`}>
          <div className={style.protezFoundationLinkWrapper}>
            <Link href={'/'} className={style.protezFoundationLink}>
              <span>Protez Foundation</span>
              {icons.arrowUp(style.icon)}
            </Link>
          </div>
          <div className={style.navigationWrapper}>
            <nav ref={ref} className={style.navigation}>
              <ul className={style.ancorList}>
                {AncorLinks.map(({ id, text }) => (
                  <li key={id} className={style.ancorItem} onClick={closeHeaderOnAncorClick}>
                    <a href={`#${id}`} className={style.ancorLink}>
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={style.lowerPart}>
            <div className={style.lowerPartButtonsContainer}>
              <Button
                as="link"
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                target={'_blank'}
                variant="primary-blue"
                size="small"
                rel="noopener noreferrer"
                className={style.lowerPartButton}
              >
                Apply to Academy
                {/* {texts.academyHeader.buttons.applyToAcademy[lang]} */}
              </Button>
              <Button
                as="link"
                href="/"
                variant="secondary-black"
                size="small"
                className={style.lowerPartButton}
              >
                Support Academy
                {/* {texts.academyHeader.buttons.supportAcademy[lang]} */}
                {icons.arrowUp(`${style.icon} ${style.black}`)}
              </Button>
            </div>

            <a className={style.phoneNumber} href="tel:+16127724777">
              {icons.call(style.icon)}
              <span> +1 612-772-4777</span>
            </a>

            <div className={style.languageButtonContainer}>
              <button className={style.languageButton}>
                {icons.iconWorld(style.icon)}
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
