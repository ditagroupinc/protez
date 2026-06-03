'use client'

import { useState, useEffect, useTransition } from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/lib/i18n'

import Button from '@/components/AcademyButton'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import useOutsideClick from '@/hooks/useOutsideClick'

import { BurgerButton } from '@/components/BurgerButton'

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

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const t = useTranslations('academy')

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const switchLocale = (next: 'en' | 'uk') => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

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
      <header className={styles.academyHeader}>
        <a href="#academyIntro">{icons.protezAcademyLogo()}</a>
        <div className={styles.burgerStandalone}>
          <BurgerButton
            isBlack={false}
            color="blue"
            onClick={toggleHeader}
            close={headerIsOpened}
          />
        </div>
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
            {t('cta.apply')}
          </Button>
          <Button as="link" href="/" variant="secondary-white" size="small">
            {t('header.cta.foundation')}
          </Button>
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
          <BurgerButton
            isBlack={false}
            color="blue"
            onClick={toggleHeader}
            close={headerIsOpened}
          />
        </div>
        <div className={`${styles.sideMenu} ${headerIsOpened ? styles.opened : ''}`}>
          <div className={styles.protezFoundationLinkWrapper}>
            <Link href={'/'} className={styles.protezFoundationLink}>
              <span>{t('header.cta.foundation')}</span>
              {icons.arrowUp(styles.icon)}
            </Link>
          </div>
          <div className={styles.navigationWrapper}>
            <nav ref={ref} className={styles.navigation}>
              <ul className={styles.ancorList}>
                {AncorLinkIds.map(id => (
                  <li key={id} className={styles.ancorItem} onClick={closeHeaderOnAncorClick}>
                    <a href={`#${id}`} className={styles.ancorLink}>
                      {t(`header.nav.${id}`)}
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
                {t('cta.apply')}
              </Button>
              <Button
                as="link"
                href={DONATE_URL}
                variant="secondary-black"
                size="small"
                className={styles.lowerPartButton}
              >
                {t('cta.support')}
                {icons.arrowUp(`${styles.icon} ${styles.black}`)}
              </Button>
            </div>

            <a className={styles.phoneNumber} href="tel:+16127724777">
              {icons.call(styles.icon)}
              <span> {t('header.phone')}</span>
            </a>

            <div className={styles.languageButtonContainer}>
              <button
                className={styles.languageButton}
                onClick={() => switchLocale(locale === 'uk' ? 'en' : 'uk')}
              >
                {icons.iconWorld(styles.icon)}
                <span>{t('header.cta.language')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <SocialMediaLinks
        color="blue"
        className={`${styles.desktopSocialMedia} ${headerIsOpened ? ' hidden' : ''}`}
      />
    </>
  )
}

export default AcademyHeader
