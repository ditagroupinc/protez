'use client'

import { useState, useEffect, useCallback } from 'react'

import { Languages } from '@/types'

import { useLanguage } from '@/contexts/LanguageContext'
import { useSharedTexts } from '@/hooks/useSharedTexts'

import Button, { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from './BurgerButton'

import style from './style.module.scss'

import Link from 'next/link'

import { icons } from './icons'
import { H3 } from '@/components/Typography'
import { ProtezIDs, AcademyIDs } from '@/consts'
import { ApplyToAcademyButton } from '@/components/Button'
import BackToTopButton from './BackToTopButton'

const navigationIds = {
  protezPage: [
    ProtezIDs.LetsGiveHope,
    ProtezIDs.PeopleTrustUs,
    ProtezIDs.ProstheticsForUkrainians,
    ProtezIDs.InNeed,
    ProtezIDs.OurResults,
    ProtezIDs.SampleProsthesesCosts,
    ProtezIDs.ProtezAcademy,
    ProtezIDs.Veterans,
    ProtezIDs.Events,
    ProtezIDs.PressRelease,
    ProtezIDs.OurPatients,
    ProtezIDs.MeetOurTeam,
    ProtezIDs.OfficeLocations,
    ProtezIDs.SpecialThanksToAllOurPartners,
    ProtezIDs.MailingList,
    ProtezIDs.Merch,
  ],
  academyPage: [
    AcademyIDs.Intro,
    AcademyIDs.OurGoals,
    AcademyIDs.Academy,
    AcademyIDs.OurResults,
    AcademyIDs.OurTeachers,
    AcademyIDs.Chief,
    AcademyIDs.TheoryLectures,
    AcademyIDs.PracticeSessions,
    AcademyIDs.PastAndUpcomingEvents,
    AcademyIDs.AcademyStudents,
    AcademyIDs.AmputeeRehab,
    AcademyIDs.SummitResults,
    AcademyIDs.WeAreInNews,
    AcademyIDs.SpecialThanksToAllOurPartners,
  ],
}

const socialMediaLinks = [
  {
    address: 'https://www.youtube.com/@Protezfoundation',
    icon: icons.youtube,
  },
  {
    address: 'https://www.facebook.com/prostheticsforukrainians/',
    icon: icons.facebook,
  },
  {
    address: 'https://www.instagram.com/protezfoundation/',
    icon: icons.instagram,
  },
  {
    address: 'https://www.linkedin.com/company/protez-foundation/',
    icon: icons.linkedin,
  },
]

const Header = ({
  ancorLinks = true,
  arrowUp = true,
  layout,
}: {
  ancorLinks?: boolean
  arrowUp?: boolean
  layout: 'protezPage' | 'academyPage'
}) => {
  const [headerIsOpened, setHeaderIsOpened] = useState(false)

  const { width } = useScreenModeAndSize()

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const { lang, setLang } = useLanguage()
  const t = useSharedTexts().header

  const handleLanguageChange = useCallback(() => {
    const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

    setLang(langToSet)
    localStorage.setItem('lang', langToSet)
  }, [lang, setLang])

  const isMobile = width < 768
  const linksPrefix = ancorLinks ? '#' : '/'
  const accentColor = layout === 'protezPage' ? 'red' : 'blue'
  const backToTopHref =
    layout === 'protezPage' ? '#' + ProtezIDs.LetsGiveHope : '#' + AcademyIDs.Intro

  const navItems = t[layout].navigation.map((label, index) => ({
    text: label,
    id: navigationIds[layout][index],
  }))

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
      <header className={style.header}>
        <Link
          scroll={true}
          href={`${ancorLinks ? linksPrefix + ProtezIDs.LetsGiveHope : linksPrefix}`}
        >
          {icons[layout].logo(style.protezLogo)}
        </Link>
        {width < 992 ? (
          <div className={style.burgerButtonContainer}>
            <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
          </div>
        ) : (
          <div className={style.topMenu}>
            <div className={style.buttonsGroup}>
              {layout === 'protezPage' ? (
                <>
                  <MakeDonationButton lang={lang} size="small" />

                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    target="_blank"
                    variant="secondary-white"
                    size="small"
                  >
                    {t.protezPage.actionButtons.needAProthesis}
                  </Button>
                </>
              ) : (
                <>
                  <ApplyToAcademyButton lang={lang} size="small" />

                  <Button as="link" href="/" variant="secondary-white" size="small">
                    {t.academyPage.actionButtons.protezFoundation}
                  </Button>
                </>
              )}
            </div>
            <div className={style.languageWrapper}>
              {icons.world(`${style.worldIcon}`)}
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.English}
                className={style.localeBtn}
              >
                EN
              </button>
              <span className={style.divider} />
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.Ukrainian}
                className={style.localeBtn}
              >
                UA
              </button>
            </div>
            <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}
        <div className={`${style.sideMenu} ${headerIsOpened ? style.opened : ''}`}>
          <div className={style.protezAcademyLinkWrapper}>
            <Link href={'/academy'} className={`${style.protezAcademyLink} ${style.blue}`}>
              <H3>{t.protezAcademy}</H3>
              {icons.arrowUp(`${style.icon} ${style.blue}`)}
            </Link>
          </div>
          <div className={style.navigationWrapper}>
            <nav ref={ref} className={`${style.navigation} ${style[accentColor]}`}>
              <ul className={style.ancorList}>
                {navItems.map(item => (
                  <li key={item.id} className={style.ancorItem} onClick={closeHeaderOnAncorClick}>
                    <Link href={`${linksPrefix}${item.id}`} className={`${style.ancorLink}`}>
                      <H3>{item.text}</H3>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={style.lowerPart}>
            <div className={style.lowerPartButtonsContainer}>
              {layout === 'protezPage' ? (
                <>
                  <MakeDonationButton lang={lang} className={style.lowerPartButton} size="normal" />
                  <SupportWithAmazonButton
                    lang={lang}
                    className={style.lowerPartButton}
                    size="normal"
                  />

                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    target="_blank"
                    variant="secondary-black"
                    size="normal"
                    arrow
                    className={style.lowerPartButton}
                  >
                    {t.protezPage.actionButtons.needAProthesis}
                  </Button>
                </>
              ) : (
                <>
                  <ApplyToAcademyButton lang={lang} size="small" />

                  <Button as="link" href="/" variant="secondary-black" size="small" arrow>
                    {t.academyPage.actionButtons.supportAcademy}
                  </Button>
                </>
              )}
            </div>

            <a className={style.phoneNumber} href="tel:+16129972005">
              {icons.call(style.icon)}
              <span> +1 612-997-2005</span>
            </a>

            <div className={style.languageButtonContainer}>
              <button className={style.languageButton} onClick={handleLanguageChange}>
                {icons.world(style.icon)}
                <span>{lang}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {!headerIsOpened && (
        <div className={style.socialMediaLinksContainer}>
          {isMobile && arrowUp && (
            <Link href={backToTopHref} className={style.socialMediaLink}>
              {icons.up(style.socialMediaLinkIcon)}
            </Link>
          )}
          {socialMediaLinks.map((link, index) => (
            <a key={index} href={link.address} className={style.socialMediaLink} target="blank">
              {link.icon(style.socialMediaLinkIcon)}
            </a>
          ))}
        </div>
      )}
      {!isMobile && ancorLinks && <BackToTopButton href={backToTopHref} color={accentColor} />}
    </>
  )
}

export default Header
