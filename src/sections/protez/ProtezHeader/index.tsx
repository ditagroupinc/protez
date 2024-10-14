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

import { BurgerButton } from '@/components/BurgerButton'

import style from './style.module.scss'

import Link from 'next/link'

import { icons } from './icons'
import { H3 } from '@/components/Typography'
import { ProtezIDs } from '../../../../app/consts'

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
        english: 'People Trust Us',
        ukrainian: 'PeopleTrustUs',
      },
      id: ProtezIDs.PeopleTrustUs,
    },
    {
      text: {
        english: 'Prosthetics For Ukrainians',
        ukrainian: 'ProstheticsForUkrainians',
      },
      id: ProtezIDs.ProstheticsForUkrainians,
    },
    {
      text: {
        english: 'In Need',
        ukrainian: 'In Need',
      },
      id: ProtezIDs.InNeed,
    },
    {
      text: {
        english: 'Our Results',
        ukrainian: 'Our Results',
      },
      id: ProtezIDs.OurResults,
    },
    {
      text: {
        english: 'Sample Prostheses Costs',
        ukrainian: 'Sample Prostheses Costs',
      },
      id: ProtezIDs.SampleProsthesesCosts,
    },
    {
      text: {
        english: 'Protez Academy',
        ukrainian: 'Protez Academy',
      },
      id: ProtezIDs.ProtezAcademy,
    },
    {
      text: {
        english: 'Veterans',
        ukrainian: 'Veterans',
      },
      id: ProtezIDs.Veterans,
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
        english: 'Press Release',
        ukrainian: 'Press Release',
      },
      id: ProtezIDs.PressRelease,
    },
    {
      text: {
        english: 'Our Patients',
        ukrainian: 'Our Patients',
      },
      id: ProtezIDs.OurPatients,
    },
    {
      text: {
        english: 'Meet Our Team',
        ukrainian: 'Meet Our Team',
      },
      id: ProtezIDs.MeetOurTeam,
    },
    {
      text: {
        english: 'Office Locations',
        ukrainian: 'Office Locations',
      },
      id: ProtezIDs.OfficeLocations,
    },
    {
      text: {
        english: 'Special Thanks To All Our Partners',
        ukrainian: 'Special Thanks To All Our Partners',
      },
      id: ProtezIDs.SpecialThanksToAllOurPartners,
    },
    {
      text: {
        english: 'Our Star Supporters',
        ukrainian: 'Our Star Supporters',
      },
      id: ProtezIDs.OurStarSupporters,
    },
    {
      text: {
        english: 'Mailing List',
        ukrainian: 'Mailing List',
      },
      id: ProtezIDs.MailingList,
    },
    {
      text: {
        english: 'Merch',
        ukrainian: 'Merch',
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

const ProtezHeader = ({
  ancorLinks = true,
  arrowUp = true,
}: {
  ancorLinks?: boolean
  arrowUp?: boolean
}) => {
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
  const linksPrefix = ancorLinks ? '#' : '/'

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
        <Link scroll={true} href={`${linksPrefix}${ProtezIDs.LetsGiveHope}`}>
          {icons.protezLogo()}
        </Link>
        {width < 992 ? (
          <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
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
            <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
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
                    <Link href={`${linksPrefix}${id}`} className={style.ancorLink}>
                      <H3>{text[lang]}</H3>
                    </Link>
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
          {isMobile && arrowUp && (
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
