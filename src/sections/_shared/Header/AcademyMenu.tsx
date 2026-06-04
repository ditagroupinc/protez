'use client'

import { Ref } from 'react'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import AcademyButton from '@/components/AcademyButton'

import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '@academy/consts/links'

import { icons } from './icons'
import style from './style.module.scss'
import { ACADEMY_NAV_IDS, ACADEMY_PHONE_TEL } from './config'

type Props = {
  ancorLinks: boolean
  closeMenu: () => void
  navRef: Ref<HTMLElement>
}

const AcademyMenu = ({ ancorLinks, closeMenu, navRef }: Props) => {
  const t = useTranslations('academy')
  const linksPrefix = ancorLinks ? '#' : '/'

  return (
    <>
      <div className={style.protezFoundationLinkWrapper}>
        <Link href="/" className={style.protezFoundationLink}>
          <span>{t('header.cta.foundation')}</span>
          {icons.arrowUp(style.icon)}
        </Link>
      </div>
      <div className={style.navigationWrapper}>
        <nav ref={navRef} className={`${style.navigation} ${style.blue}`}>
          <ul className={style.ancorList}>
            {ACADEMY_NAV_IDS.map(id => (
              <li key={id} className={style.ancorItem} onClick={closeMenu}>
                <Link href={`${linksPrefix}${id}`} className={style.ancorLink}>
                  {t(`header.nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={style.lowerPart}>
        <div className={style.lowerPartButtonsContainer}>
          <AcademyButton
            as="link"
            href={ACADEMY_APPLY_FORM_URL}
            target="_blank"
            variant="primary-blue"
            size="small"
            rel="noopener noreferrer"
            className={style.lowerPartButton}
          >
            {t('cta.apply')}
          </AcademyButton>
          <AcademyButton
            as="link"
            href={DONATE_URL}
            variant="secondary-black"
            size="small"
            className={style.lowerPartButton}
          >
            {t('cta.support')}
            {icons.arrowUp(`${style.icon} ${style.black}`)}
          </AcademyButton>
        </div>
        <a className={style.phoneNumber} href={ACADEMY_PHONE_TEL}>
          {icons.call(style.icon)}
          <span> {t('header.phone')}</span>
        </a>
      </div>
    </>
  )
}

export default AcademyMenu
