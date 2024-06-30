'use client'

import { useState, useEffect, useCallback } from 'react'

import { Languages } from '@/types'

import { useLanguage } from '@/contexts/LanguageContext'

import ProtezButton from '@/components/ProtezButton'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from '@/sections/Header/components/BurgerButton'

import style from './style.module.scss'

import Link from 'next/link'

import { icons } from './icons'
import { H3 } from '@/components/Typography'

const headerText = {
  menu: {
    english: 'Menu',
    ukrainian: 'Menu',
  },
  getInTouch: {
    english: 'Get in touch',
    ukrainian: 'Get in touch',
  },

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
      id: 'letsGiveHope',
    },
    {
      text: {
        english: 'Mission',
        ukrainian: 'Місія',
      },
      id: 'ourMission',
    },
    {
      text: {
        english: 'Results',
        ukrainian: 'Досягнення',
      },
      id: 'ourResults',
    },
    {
      text: {
        english: 'Ukraine',
        ukrainian: 'Україна',
      },
      id: 'inNeed',
    },
    {
      text: {
        english: 'What we do',
        ukrainian: 'Наша робота',
      },
      id: 'prosthetics',
    },
    {
      text: {
        english: 'Stories',
        ukrainian: 'Історії',
      },
      id: 'veterans',
    },
    {
      text: {
        english: 'Press release',
        ukrainian: 'Прес-реліз',
      },
      id: 'pressRelease',
    },
    {
      text: {
        english: 'Events',
        ukrainian: 'Події',
      },
      id: 'events',
    },
    {
      text: {
        english: 'Team',
        ukrainian: 'Команда',
      },
      id: 'ourTeam',
    },
    {
      text: {
        english: 'Partners',
        ukrainian: 'Партнери',
      },
      id: 'ourPartners',
    },
    {
      text: {
        english: 'News',
        ukrainian: 'Новини',
      },
      id: 'news',
    },
    {
      text: {
        english: 'Protez Merch',
        ukrainian: 'Protez-мерч',
      },
      id: 'merch',
    },
  ],

  actionButtons: {
    // protezAcademy: {
    //   english: 'Protez Academy',
    //   ukrainian: 'Protez Academy',
    // },
    makeDonation: {
      english: 'Make Donation',
      ukrainian: 'Зробити внесок!',
    },
    needAProthesis: {
      english: 'Потрібeн протез?',
      ukrainian: 'Потрібeн протез?',
    },
    supportWith: {
      english: 'Support with',
      ukrainian: 'Підтримати з',
    },

    back2top: {
      english: 'Back to top   →',
      ukrainian: 'Back to top   →',
    },
    // lang: {
    //   english: 'Language',
    //   ukrainian: 'Language',
    // },
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
            <ProtezButton
              as="link"
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target={'_blank'}
              variant="primary-red"
              size="small"
              rel="noopener noreferrer"
              className={style.applyBtn}
            >
              {headerText.actionButtons.makeDonation[lang]}
            </ProtezButton>
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
              <ProtezButton
                as="link"
                href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
                target={'_blank'}
                variant="primary-red"
                rel="noopener noreferrer"
                className={style.lowerPartButton}
              >
                {headerText.actionButtons.makeDonation[lang]}
              </ProtezButton>
              <ProtezButton
                as="link"
                href="/"
                variant="secondary-black"
                className={style.lowerPartButton}
              >
                {headerText.actionButtons.supportWith[lang]}

                {icons.amazon(`${style.icon}`)}
              </ProtezButton>
              <ProtezButton
                as="link"
                href="/"
                variant="secondary-black"
                className={style.lowerPartButton}
              >
                {headerText.actionButtons.needAProthesis[lang]}

                {icons.arrowUp(`${style.icon} ${style.black}`)}
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
