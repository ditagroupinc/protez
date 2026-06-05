'use client'

import { Ref, useTransition } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import Link from 'next/link'

import Button, { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'
import { H3 } from '@/components/Typography'
import { persistLocaleChoice, usePathname, useRouter } from '@/lib/i18n'

import { icons } from './icons'
import style from './style.module.scss'
import { HOME_NAV_IDS, HOME_PHONE, HOME_PHONE_TEL, NEED_A_PROTHESIS_URL } from './config'

type Props = {
  ancorLinks: boolean
  closeMenu: () => void
  navRef: Ref<HTMLElement>
}

const HomeMenu = ({ ancorLinks, closeMenu, navRef }: Props) => {
  const t = useTranslations('shared.header')

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

  const linksPrefix = ancorLinks ? '#' : '/'
  const labels = t.raw('protezPage.navigation') as string[]

  return (
    <>
      <div className={style.protezAcademyLinkWrapper}>
        <Link href="/academy" className={`${style.protezAcademyLink} ${style.blue}`}>
          <H3>{t('protezAcademy')}</H3>
          {icons.arrowUp(`${style.icon} ${style.blue}`)}
        </Link>
      </div>
      <div className={style.navigationWrapper}>
        <nav ref={navRef} className={`${style.navigation} ${style.red}`}>
          <ul className={style.ancorList}>
            {HOME_NAV_IDS.map((id, index) => (
              <li key={id} className={style.ancorItem} onClick={closeMenu}>
                <Link href={`${linksPrefix}${id}`} className={style.ancorLink}>
                  <H3>{labels[index]}</H3>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={style.lowerPart}>
        <div className={style.lowerPartButtonsContainer}>
          <MakeDonationButton className={style.lowerPartButton} size="normal" />
          <SupportWithAmazonButton className={style.lowerPartButton} size="normal" />
          <Button
            as="link"
            href={NEED_A_PROTHESIS_URL}
            target="_blank"
            variant="secondary-black"
            size="normal"
            arrow
            className={style.lowerPartButton}
          >
            {t('protezPage.actionButtons.needAProthesis')}
          </Button>
        </div>
        <a className={style.phoneNumber} href={HOME_PHONE_TEL}>
          {icons.call(style.icon)}
          <span> {HOME_PHONE}</span>
        </a>
        <div className={style.languageButtonContainer}>
          <button
            type="button"
            className={style.languageButton}
            onClick={() => switchLocale(locale === 'uk' ? 'en' : 'uk')}
          >
            {icons.world(style.icon)}
            <span>{locale === 'uk' ? 'Українська' : 'English'}</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default HomeMenu
