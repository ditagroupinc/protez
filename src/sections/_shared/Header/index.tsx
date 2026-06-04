'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import useOutsideClick from '@/hooks/useOutsideClick'
import SocialMediaLinks from '@/components/SocialMediaLinks'

import { BurgerButton } from './BurgerButton'
import BackToTopButton from './BackToTopButton'
import TopBarCtas from './TopBarCtas'
import HomeMenu from './HomeMenu'
import AcademyMenu from './AcademyMenu'

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
  const resolvedSideMenu: HeaderSideMenu = sideMenu ?? variant
  const hasSideMenu = resolvedSideMenu !== 'none'

  const [headerIsOpened, setHeaderIsOpened] = useState(false)
  const ref = useOutsideClick(() => setHeaderIsOpened(false))

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

  const logoHref = ancorLinks ? `#${cfg.homeAnchor}` : variant === 'home' ? '/' : '/academy'

  const renderSideMenu = () => {
    if (resolvedSideMenu === 'home') {
      return <HomeMenu ancorLinks={ancorLinks} closeMenu={closeMenu} navRef={ref} />
    }

    if (resolvedSideMenu === 'academy') {
      return <AcademyMenu ancorLinks={ancorLinks} closeMenu={closeMenu} navRef={ref} />
    }

    return null
  }

  return (
    <>
      <header className={`${style.header} ${style[variant]}`}>
        <Link scroll={true} href={logoHref}>
          {cfg.logoRender(style.protezLogo)}
        </Link>

        {hasSideMenu && (
          <div className={style.burgerButtonContainer}>
            <BurgerButton color={cfg.accent} onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}

        <div className={style.topMenu}>
          <div className={style.buttonsGroup}>
            <TopBarCtas variant={variant} />
          </div>
          {hasSideMenu && (
            <BurgerButton color={cfg.accent} onClick={toggleHeader} close={headerIsOpened} />
          )}
        </div>

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
