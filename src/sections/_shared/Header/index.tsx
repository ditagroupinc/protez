'use client'

import { useState, useEffect, useCallback } from 'react'

import { Languages } from '@/types'

import { useLanguage } from '@/contexts/LanguageContext'

import Button, { MakeDonationButton, SupportWithAmazonButton } from '@/components/Button'

import useOutsideClick from '@/hooks/useOutsideClick'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { BurgerButton } from './BurgerButton'

import style from './style.module.scss'

import Link from 'next/link'

import { icons } from './icons'
import { H3 } from '@/components/Typography'
import { ProtezIDs, AcademyIDs } from '@/consts'
import { ApplyToAcademyButton } from '@/components/Button'
import BackToTopButton from './BackToTopButton'

const text = {
  protezAcademy: {
    english: 'Protez Academy',
    ukrainian: 'Protez Academy',
  },

  protezPage: {
    actionButtons: {
      needAProthesis: {
        english: 'Потрібeн протез',
        ukrainian: 'Потрібeн протез',
      },
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
          ukrainian: 'Люди довіряють нам',
        },
        id: ProtezIDs.PeopleTrustUs,
      },
      {
        text: {
          english: 'Prosthetics For Ukrainians',
          ukrainian: 'Протезування для українців',
        },
        id: ProtezIDs.ProstheticsForUkrainians,
      },
      {
        text: {
          english: 'In Need',
          ukrainian: 'У потребі',
        },
        id: ProtezIDs.InNeed,
      },
      {
        text: {
          english: 'Our Results',
          ukrainian: 'Наші результати',
        },
        id: ProtezIDs.OurResults,
      },
      {
        text: {
          english: 'Prostheses Costs',
          ukrainian: 'Витрати на протези',
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
          english: 'Stories',
          ukrainian: 'Історії',
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
          ukrainian: 'Прес-реліз',
        },
        id: ProtezIDs.PressRelease,
      },
      {
        text: {
          english: 'Our Patients',
          ukrainian: 'Наші пацієнти',
        },
        id: ProtezIDs.OurPatients,
      },
      {
        text: {
          english: 'Team',
          ukrainian: 'Команда',
        },
        id: ProtezIDs.MeetOurTeam,
      },
      {
        text: {
          english: 'Locations',
          ukrainian: 'Клініки',
        },
        id: ProtezIDs.OfficeLocations,
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
          english: 'Subscribe to Updates',
          ukrainian: 'Підписатися на оновлення',
        },
        id: ProtezIDs.MailingList,
      },
      {
        text: {
          english: 'Protez Merch',
          ukrainian: 'Protez Мерч',
        },
        id: ProtezIDs.Merch,
      },
    ],
  },

  academyPage: {
    actionButtons: {
      protezFoundation: {
        english: 'Protez Foundation',
        ukrainian: 'Protez Foundation',
      },
      supportAcademy: {
        english: 'Support Academy',
        ukrainian: 'Support Academy',
      },
    },
    navigation: [
      {
        text: {
          english: 'Home',
          ukrainian: 'Home',
        },
        id: AcademyIDs.Intro,
      },
      {
        text: {
          english: 'Our Goals',
          ukrainian: 'Our Goals',
        },
        id: AcademyIDs.OurGoals,
      },
      {
        text: {
          english: 'Academy',
          ukrainian: 'Academy',
        },
        id: AcademyIDs.Academy,
      },
      {
        text: {
          english: 'Our Results',
          ukrainian: 'Our Results',
        },
        id: AcademyIDs.OurResults,
      },
      {
        text: {
          english: 'Academy Teachers',
          ukrainian: 'Academy Teachers',
        },
        id: AcademyIDs.OurTeachers,
      },
      {
        text: {
          english: 'Chief',
          ukrainian: 'Chief',
        },
        id: AcademyIDs.Chief,
      },
      {
        text: {
          english: 'Theory Lectures',
          ukrainian: 'Theory Lectures',
        },
        id: AcademyIDs.TheoryLectures,
      },
      {
        text: {
          english: 'Practice Sessions',
          ukrainian: 'Practice Sessions',
        },
        id: AcademyIDs.PracticeSessions,
      },
      {
        text: {
          english: 'Events',
          ukrainian: 'Events',
        },
        id: AcademyIDs.PastAndUpcomingEvents,
      },
      {
        text: {
          english: 'Students',
          ukrainian: 'Students',
        },
        id: AcademyIDs.AcademyStudents,
      },
      {
        text: {
          english: 'Amputee Rehab',
          ukrainian: 'Amputee Rehab',
        },
        id: AcademyIDs.AmputeeRehab,
      },
      {
        text: {
          english: 'Summit',
          ukrainian: 'Summit',
        },
        id: AcademyIDs.SummitResults,
      },
      {
        text: {
          english: 'We Are In News',
          ukrainian: 'We Are In News',
        },
        id: AcademyIDs.WeAreInNews,
      },
      {
        text: {
          english: 'Partners',
          ukrainian: 'Partners',
        },
        id: AcademyIDs.SpecialThanksToAllOurPartners,
      },
    ],
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
  const accentColor = layout === 'protezPage' ? 'red' : 'blue'
  const backToTopHref =
    layout === 'protezPage' ? '#' + ProtezIDs.LetsGiveHope : '#' + AcademyIDs.Intro

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
      <header className={style.header}>
        <Link
          scroll={true}
          href={`${ancorLinks ? linksPrefix + ProtezIDs.LetsGiveHope : linksPrefix}`}
        >
          {icons[layout].logo(style.protezLogo)}
        </Link>
        {width < 992 ? (
          <div className={style.burgerButtonContainer}>
            <BurgerButton color="red" onClick={toggleHeader} close={headerIsOpened} />
          </div>
        ) : (
          <div className={style.topMenu}>
            <div className={style.buttonsGroup}>
              {layout === 'protezPage' ? (
                <>
                  <MakeDonationButton lang={lang} size="small" />

                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    // https://forms.gle/Wr3Tf9UJCLCq4sAQ6
                    target="_blank"
                    variant="secondary-white"
                    size="small"
                  >
                    {text[layout].actionButtons.needAProthesis[lang]}
                  </Button>
                </>
              ) : (
                <>
                  <ApplyToAcademyButton lang={lang} size="small" />

                  <Button as="link" href="/" variant="secondary-white" size="small">
                    {text[layout].actionButtons.protezFoundation[lang]}
                  </Button>
                </>
              )}
            </div>
            <div className={style.languageWrapper}>
              {icons.world(`${style.worldIcon}`)}
              <button
                onClick={handleLanguageChange}
                disabled={lang === Languages.English}
                className={style.localeBtn}
              >
                EN
              </button>
              <span className={style.divider} />
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
          <div className={style.protezAcademyLinkWrapper}>
            <Link href={'/academy'} className={`${style.protezAcademyLink} ${style.blue}`}>
              <H3>{text.protezAcademy[lang]}</H3>
              {icons.arrowUp(`${style.icon} ${style.blue}`)}
            </Link>
          </div>
          <div className={style.navigationWrapper}>
            <nav ref={ref} className={`${style.navigation} ${style[accentColor]}`}>
              <ul className={style.ancorList}>
                {text[layout].navigation.map(item => {
                  const { id, text } = item
                  const customHref = 'href' in item ? (item.href as string) : undefined
                  const itemAccent = 'accent' in item ? (item.accent as string) : undefined

                  return (
                    <li key={id} className={style.ancorItem} onClick={closeHeaderOnAncorClick}>
                      <Link
                        href={customHref ?? `${linksPrefix}${id}`}
                        className={`${style.ancorLink} ${itemAccent ? style[itemAccent] : ''}`}
                      >
                        <H3>{text[lang]}</H3>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className={style.lowerPart}>
            <div className={style.lowerPartButtonsContainer}>
              {layout === 'protezPage' ? (
                <>
                  <MakeDonationButton lang={lang} className={style.lowerPartButton} size="normal" />
                  <SupportWithAmazonButton
                    lang={lang}
                    className={style.lowerPartButton}
                    size="normal"
                  />

                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    target="_blank"
                    variant="secondary-black"
                    size="normal"
                    arrow
                    className={style.lowerPartButton}
                  >
                    {text[layout].actionButtons.needAProthesis[lang]}
                  </Button>
                </>
              ) : (
                <>
                  <ApplyToAcademyButton lang={lang} size="small" />

                  <Button as="link" href="/" variant="secondary-black" size="small" arrow>
                    {text[layout].actionButtons.supportAcademy[lang]}
                  </Button>
                </>
              )}
            </div>

            <a className={style.phoneNumber} href="tel:+16129972005">
              {icons.call(style.icon)}
              <span> +1 612-997-2005</span>
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
            <Link href={backToTopHref} className={style.socialMediaLink}>
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
      {!isMobile && ancorLinks && <BackToTopButton href={backToTopHref} color={accentColor} />}
    </>
  )
}

export default Header
