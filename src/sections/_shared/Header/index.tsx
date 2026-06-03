'use client'

import { useState, useEffect, useTransition } from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/lib/i18n'

import Button, { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'

import useOutsideClick from '@/hooks/useOutsideClick'

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
    AcademyIDs.Chief,
    AcademyIDs.PastAndUpcomingEvents,
    AcademyIDs.AcademyStudents,
    AcademyIDs.AmputeeRehab,
    AcademyIDs.SummitResults,
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

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()
  const t = useTranslations('shared.header')

  const switchLocale = (next: 'en' | 'uk') => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  const linksPrefix = ancorLinks ? '#' : '/'
  const accentColor = layout === 'protezPage' ? 'red' : 'blue'
  const backToTopHref =
    layout === 'protezPage' ? '#' + ProtezIDs.LetsGiveHope : '#' + AcademyIDs.Intro

  const navItems = (t.raw(`${layout}.navigation`) as string[]).map((label, index) => ({
    text: label,
    id: navigationIds[layout][index],
  }))

  useEffect(() => {
    if (headerIsOpened) {
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
    setHeaderIsOpened(false)
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
        <div className={style.burgerButtonContainer}>
          <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
        </div>
        <div className={style.topMenu}>
          <div className={style.buttonsGroup}>
            {layout === 'protezPage' ? (
              <>
                <MakeDonationButton size="small" />

                <Button
                  as="link"
                  href="https://forms.gle/WUVBvfZhYJsanGVbA"
                  target="_blank"
                  variant="secondary-white"
                  size="small"
                >
                  {t('protezPage.actionButtons.needAProthesis')}
                </Button>
              </>
            ) : (
              <>
                <ApplyToAcademyButton size="small" />

                <Button as="link" href="/" variant="secondary-white" size="small">
                  {t('academyPage.actionButtons.protezFoundation')}
                </Button>
              </>
            )}
          </div>
          <div className={style.languageWrapper}>
            {icons.world(`${style.worldIcon}`)}
            <button
              onClick={() => switchLocale('en')}
              disabled={locale === 'en'}
              className={style.localeBtn}
            >
              EN
            </button>
            <span className={style.divider} />
            <button
              onClick={() => switchLocale('uk')}
              disabled={locale === 'uk'}
              className={style.localeBtn}
            >
              UA
            </button>
          </div>
          <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
        </div>
        <div className={`${style.sideMenu} ${headerIsOpened ? style.opened : ''}`}>
          <div className={style.protezAcademyLinkWrapper}>
            <Link href={'/academy'} className={`${style.protezAcademyLink} ${style.blue}`}>
              <H3>{t('protezAcademy')}</H3>
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
                  <MakeDonationButton className={style.lowerPartButton} size="normal" />
                  <SupportWithAmazonButton className={style.lowerPartButton} size="normal" />

                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    target="_blank"
                    variant="secondary-black"
                    size="normal"
                    arrow
                    className={style.lowerPartButton}
                  >
                    {t('protezPage.actionButtons.needAProthesis')}
                  </Button>
                </>
              ) : (
                <>
                  <ApplyToAcademyButton size="small" />

                  <Button as="link" href="/" variant="secondary-black" size="small" arrow>
                    {t('academyPage.actionButtons.supportAcademy')}
                  </Button>
                </>
              )}
            </div>

            <a className={style.phoneNumber} href="tel:+16129972005">
              {icons.call(style.icon)}
              <span> +1 612-997-2005</span>
            </a>

            <div className={style.languageButtonContainer}>
              <button
                className={style.languageButton}
                onClick={() => switchLocale(locale === 'uk' ? 'en' : 'uk')}
              >
                {icons.world(style.icon)}
                <span>{locale === 'uk' ? 'Українська' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {!headerIsOpened && (
        <div className={style.socialMediaLinksContainer}>
          {arrowUp && (
            <Link
              href={backToTopHref}
              className={`${style.socialMediaLink} ${style.mobileArrowUp}`}
            >
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
      {ancorLinks && (
        <div className={style.desktopBackToTop}>
          <BackToTopButton href={backToTopHref} color={accentColor} />
        </div>
      )}
    </>
  )
}

export default Header
