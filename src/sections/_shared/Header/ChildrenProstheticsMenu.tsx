'use client'

import { useTransition } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import Button, { MakeDonationButton } from '@/components/Button'
import { H3 } from '@/components/Typography'
import { Link, persistLocaleChoice, usePathname, useRouter } from '@/lib/i18n'

import PhoneContacts from './PhoneContacts'
import { icons } from './icons'
import style from './style.module.scss'
import { CHILDREN_PROSTHETICS_NAV_IDS, NEED_A_PROTHESIS_URL } from './config'

type Props = {
  accent: 'red' | 'blue' | 'teal'
  closeMenu: () => void
}

const ChildrenProstheticsMenu = ({ accent, closeMenu }: Props) => {
  const t = useTranslations('childrenProsthetics')
  const tShared = useTranslations('shared.header')

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

  const accentClass = style[accent]

  return (
    <>
      <div className={style.protezAcademyLinkWrapper}>
        <Link href="/" onClick={closeMenu} className={`${style.protezAcademyLink} ${accentClass}`}>
          <H3>{tShared('protezPage.navigation.0')}</H3>
          {icons.arrowUp(`${style.icon} ${accentClass}`)}
        </Link>
      </div>
      <div className={style.navigationWrapper}>
        <nav className={`${style.navigation} ${accentClass}`}>
          <ul className={style.ancorList}>
            {CHILDREN_PROSTHETICS_NAV_IDS.map(id => (
              <li key={id} className={style.ancorItem} onClick={closeMenu}>
                <Link href={`#${id}`} className={style.ancorLink}>
                  <H3>{t(`nav.${id}`)}</H3>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={style.lowerPart}>
        <div className={style.lowerPartButtonsContainer}>
          <MakeDonationButton
            className={style.lowerPartButton}
            size="normal"
            variant="primary-teal"
          />
          <Button
            as="link"
            href={NEED_A_PROTHESIS_URL}
            target="_blank"
            variant="secondary-black"
            size="normal"
            arrow
            className={style.lowerPartButton}
          >
            {tShared('protezPage.actionButtons.needAProthesis')}
          </Button>
        </div>
        <PhoneContacts />
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

export default ChildrenProstheticsMenu
