'use client'

import { useState, useEffect, useTransition } from 'react'

import { useLocale } from 'next-intl'

import Link from 'next/link'

import useOutsideClick from '@/hooks/useOutsideClick'
import SocialMediaLinks from '@/components/SocialMediaLinks'
import { persistLocaleChoice, usePathname, useRouter } from '@/lib/i18n'

import { BurgerButton } from './BurgerButton'
import BackToTopButton from './BackToTopButton'
import TopBarCtas from './TopBarCtas'
import HomeMenu from './HomeMenu'
import AcademyMenu from './AcademyMenu'
import GeneralMenu from './GeneralMenu'
import FinancialAuditMenu from './FinancialAuditMenu'
import ChildrenProstheticsMenu from './ChildrenProstheticsMenu'

import { icons } from './icons'
import { headerConfig, HeaderVariant, HeaderSideMenu } from './config'

import style from './style.module.scss'

type Props = {
  variant: HeaderVariant
  sideMenu?: HeaderSideMenu
  ancorLinks?: boolean
  arrowUp?: boolean
}

const socialMediaLinks = [
  { address: 'https://www.youtube.com/@Protezfoundation', icon: icons.youtube },
  { address: 'https://www.facebook.com/prostheticsforukrainians/', icon: icons.facebook },
  { address: 'https://www.instagram.com/protezfoundation/', icon: icons.instagram },
  { address: 'https://www.linkedin.com/company/protez-foundation/', icon: icons.linkedin },
]

const Header = ({ variant, sideMenu, ancorLinks = true, arrowUp = true }: Props) => {
  const cfg = headerConfig[variant]
  const resolvedSideMenu: HeaderSideMenu =
    sideMenu ?? (variant === 'home' || variant === 'academy' ? variant : 'general')
  const hasSideMenu = resolvedSideMenu !== 'none'

  const [headerIsOpened, setHeaderIsOpened] = useState(false)
  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const switchLocale = (next: 'en' | 'uk') => {
    if (next === locale) return
    persistLocaleChoice(next)
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  useEffect(() => {
    if (!hasSideMenu) return

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
  }, [headerIsOpened, hasSideMenu])

  const toggleHeader = () => setHeaderIsOpened(prev => !prev)
  const closeMenu = () => setHeaderIsOpened(false)

  const logoHref = ancorLinks ? `#${cfg.homeAnchor}` : variant === 'academy' ? '/academy' : '/'

  const renderSideMenu = () => {
    if (resolvedSideMenu === 'home') {
      return <HomeMenu ancorLinks={ancorLinks} closeMenu={closeMenu} navRef={ref} />
    }

    if (resolvedSideMenu === 'academy') {
      return <AcademyMenu ancorLinks={ancorLinks} closeMenu={closeMenu} navRef={ref} />
    }

    if (resolvedSideMenu === 'financialAudit') {
      return <FinancialAuditMenu accent={cfg.accent} closeMenu={closeMenu} navRef={ref} />
    }

    if (resolvedSideMenu === 'childrenProsthetics') {
      return <ChildrenProstheticsMenu accent={cfg.accent} closeMenu={closeMenu} navRef={ref} />
    }

    if (resolvedSideMenu === 'general') {
      return <GeneralMenu accent={cfg.accent} closeMenu={closeMenu} navRef={ref} />
    }

    return null
  }

  return (
    <>
      <header className={`${style.header} ${style[variant]}`}>
        <Link scroll={true} href={logoHref}>
          {cfg.logoRender(style.protezLogo)}
        </Link>

        <div className={style.topMenu}>
          <div className={style.buttonsGroup}>
            <TopBarCtas variant={variant} />
          </div>
          <div className={style.languageWrapper}>
            {icons.world(style.worldIcon)}
            <button
              type="button"
              onClick={() => switchLocale('en')}
              disabled={locale === 'en'}
              className={style.localeBtn}
            >
              EN
            </button>
            <span className={style.divider} />
            <button
              type="button"
              onClick={() => switchLocale('uk')}
              disabled={locale === 'uk'}
              className={style.localeBtn}
            >
              UA
            </button>
          </div>
          {hasSideMenu && (
            <div className={style.desktopBurger}>
              <BurgerButton color={cfg.accent} onClick={toggleHeader} close={headerIsOpened} />
            </div>
          )}
        </div>

        {hasSideMenu && (
          <div className={style.burgerButtonContainer}>
            <BurgerButton color={cfg.accent} onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}

        {hasSideMenu && (
          <div
            className={`${style.sideMenu} ${style[variant]} ${headerIsOpened ? style.opened : ''}`}
          >
            {renderSideMenu()}
          </div>
        )}
      </header>

      {variant === 'home' && !headerIsOpened && (
        <div className={style.socialMediaLinksContainer}>
          {arrowUp && (
            <Link
              href={`#${cfg.homeAnchor}`}
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

      {variant === 'home' && ancorLinks && (
        <div className={style.desktopBackToTop}>
          <BackToTopButton href={cfg.homeAnchor} color={cfg.accent} />
        </div>
      )}

      {variant === 'academy' && (
        <SocialMediaLinks
          color="blue"
          className={`${style.desktopSocialMedia} ${headerIsOpened ? ' hidden' : ''}`}
        />
      )}
    </>
  )
}

export default Header
