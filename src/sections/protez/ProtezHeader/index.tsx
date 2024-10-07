'use client'

import { useState, useEffect, useCallback } from 'react'

import { Languages } from '@/types'

import { useLanguage } from '@/contexts/LanguageContext'

import ProtezButton, {
  MakeDonationButton,
  SupportWithAmazonButton,
} from '@/components/ProtezButton'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from '@/sections/Header/components/BurgerButton'

import style from './style.module.scss'

import Link from 'next/link'

import { icons } from './icons'
import { H3 } from '@/components/Typography'
import { ProtezIDs } from '../consts'

const headerText = {
  protezFoundation: {
    english: 'Protez Foundation',
    ukrainian: 'Protez Foundation',
  },

  navigation: [
    {
      text: {
        english: 'Home',
        ukrainian: 'Головна',
      },
      id: ProtezIDs.LetsGiveHope,
    },
    {
      text: {
        english: 'Mission',
        ukrainian: 'Місія',
      },
      id: ProtezIDs.OurMission,
    },
    {
      text: {
        english: 'Results',
        ukrainian: 'Досягнення',
      },
      id: ProtezIDs.OurResults,
    },
    {
      text: {
        english: 'Ukraine',
        ukrainian: 'Україна',
      },
      id: ProtezIDs.InNeed,
    },
    {
      text: {
        english: 'What we do',
        ukrainian: 'Наша робота',
      },
      id: ProtezIDs.Prosthetics,
    },
    {
      text: {
        english: 'Stories',
        ukrainian: 'Історії',
      },
      id: ProtezIDs.Veterans,
    },
    {
      text: {
        english: 'Press release',
        ukrainian: 'Прес-реліз',
      },
      id: ProtezIDs.PressRelease,
    },
    {
      text: {
        english: 'Events',
        ukrainian: 'Події',
      },
      id: ProtezIDs.Events,
    },
    {
      text: {
        english: 'Team',
        ukrainian: 'Команда',
      },
      id: ProtezIDs.OurTeam,
    },
    {
      text: {
        english: 'Partners',
        ukrainian: 'Партнери',
      },
      id: ProtezIDs.SpecialThanksToAllOurPartners,
    },
    {
      text: {
        english: 'News',
        ukrainian: 'Новини',
      },
      id: ProtezIDs.News,
    },
    {
      text: {
        english: 'Protez Merch',
        ukrainian: 'Protez-мерч',
      },
      id: ProtezIDs.Merch,
    },
  ],

  actionButtons: {
    needAProthesis: {
      english: 'Потрібeн протез',
      ukrainian: 'Потрібeн протез',
    },

    back2top: {
      english: 'Back to top   →',
      ukrainian: 'Back to top   →',
    },
  },
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

const ProtezHeader = () => {
  const [headerIsOpened, setHeaderIsOpened] = useState(false)

  const { width } = useScreenModeAndSize()

  const ref = useOutsideClick(() => setHeaderIsOpened(false))

  const { lang, setLang } = useLanguage()

  const handleLanguageChange = useCallback(() => {
    const langToSet = lang === Languages.English ? Languages.Ukrainian : Languages.English

    setLang(langToSet)
    localStorage.setItem('lang', langToSet)
  }, [lang, setLang])

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
      <header className={style.protezHeader}>
        <a href="#academyIntro">{icons.protezLogo()}</a>
        {width < 992 ? (
          <BurgerButton
            isBlack={false}
            color="blue"
            onClick={toggleHeader}
            close={headerIsOpened}
          />
        ) : (
          <div className={style.btnGroup}>
            <MakeDonationButton lang={lang} className={style.applyBtn} />

            <ProtezButton as="link" href="/" variant="secondary-white" size="small">
              {headerText.actionButtons.needAProthesis[lang]}
            </ProtezButton>
            <div className={style.languageWrapper}>
              {icons.world(`${style.worldIcon}`)}
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.English}
                className={style.localeBtn}
              >
                EN
              </button>
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.Ukrainian}
                className={style.localeBtn}
              >
                UA
              </button>
            </div>
            <BurgerButton
              isBlack={false}
              color="red"
              onClick={toggleHeader}
              close={headerIsOpened}
            />
          </div>
        )}
        <div className={`${style.sideMenu} ${headerIsOpened ? style.opened : ''}`}>
          <div className={style.protezFoundationLinkWrapper}>
            <Link href={'/'} className={style.protezFoundationLink}>
              <H3>{headerText.protezFoundation[lang]}</H3>
              {icons.arrowUp(`${style.icon} ${style.red}`)}
            </Link>
          </div>
          <div className={style.navigationWrapper}>
            <nav ref={ref} className={style.navigation}>
              <ul className={style.ancorList}>
                {headerText.navigation.map(({ id, text }) => (
                  <li key={id} className={style.ancorItem} onClick={closeHeaderOnAncorClick}>
                    <a href={`#${id}`} className={style.ancorLink}>
                      <H3>{text[lang]}</H3>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={style.lowerPart}>
            <div className={style.lowerPartButtonsContainer}>
              <MakeDonationButton lang={lang} className={style.lowerPartButton} />
              <SupportWithAmazonButton lang={lang} className={style.lowerPartButton} />

              <ProtezButton
                as="link"
                href="/"
                variant="secondary-black"
                arrow
                className={style.lowerPartButton}
              >
                {headerText.actionButtons.needAProthesis[lang]}
              </ProtezButton>
            </div>

            <a className={style.phoneNumber} href="tel:+16127724777">
              {icons.call(style.icon)}
              <span> +1 612-772-4777</span>
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
          {isMobile && (
            <a
              href={`#${headerText.navigation[0].id}`}
              className={style.socialMediaLink}
              target="blank"
            >
              {icons.up(style.socialMediaLinkIcon)}
            </a>
          )}
          {socialMediaLinks.map((link, index) => (
            <a key={index} href={link.address} className={style.socialMediaLink} target="blank">
              {link.icon(style.socialMediaLinkIcon)}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default ProtezHeader
