'use client'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'

import { icons } from './icons'
import Section from '@/components/Section'
import { Body, H3 } from '@/components/Typography'

import { BilingualText } from '@/types'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import Divider from '@/components/Divider'
import Script from 'next/script'
import SmokeWrapper from '@/sections/ProtezHomePage/SmokeWrapper'
import ProtezImage from '@/components/ProtezImage'

interface Veteran {
  ageRank: BilingualText
  name: BilingualText
  surname: BilingualText
  title: BilingualText
  text: BilingualText
  img: string
  icon: keyof typeof icons.titles
  video: string
  facebook: string
  instagram: string
  url: string
  videoLink: string
  linkedin: string
}

interface VeteransSection {
  veteran: Veteran
  share: BilingualText
  giveHope: BilingualText
  videoButton: BilingualText
}

const veteransSection: VeteransSection = {
  veteran: {
    ageRank: {
      english: '30 years old, sergeant.',
      ukrainian: '30 років, сержант.',
    },
    name: {
      english: 'Vadym',
      ukrainian: 'Вадим',
    },
    surname: {
      english: 'Fedorov',
      ukrainian: 'Федоров',
    },
    title: {
      english: 'Vadym has dedicated 10 years to the Ukrainian Army. ',
      ukrainian: 'Вадим присвятив 10 років Збройним Силам України.',
    },
    text: {
      english:
        'Defending Ukraine, he lost two legs with high amputations. Vadym is motivated and does not give up, he inspires everyone with his example. Vadym is currently in the USA undergoing prosthetics fitting and rehabilitation.  Only with your help we are able to fit Vadym with modern bionic prosthetics and return him to a full life. Together we are united and strong. Thank you for sharing this post and for your donations',
      ukrainian:
        'Захищаючи Україну, Вадим став обтяженним високими ампутаціями обох ніг. Але він продемонстрував мотивацію і відмову від здачі, ставши натхненням для всіх навколо своїм прикладом. Зараз Вадим перебуває в США, де проходить протезування та реабілітацію. Лише завдяки вашій підтримці ми зможемо оснастити Вадима сучасними біонічними протезами та повернути його до активного життя. Разом ми становимо сильну і єдину силу. Дякуємо вам за поширення цього повідомлення та ваші пожертви.',
    },
    img: 'vadymFedorov.png',
    icon: 'vadymFedorov',
    video: 'https://www.youtube.com/embed/D1zR9DkYgu4',
    facebook: 'https://www.facebook.com/donate/238890858497931/199310116131457/',
    instagram: 'https://www.instagram.com/reel/CqPla3pO_nT/?igshid=MzRlODBiNWFlZA==',
    url: 'VadymFedorov',
    videoLink:
      'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F3490463647948673%2F%3Fidorvanity%3D238890858497931&show_text=false&width=267&t=0',
    linkedin:
      'https://www.linkedin.com/posts/protez-foundation_vadym-fedorov-30-years-old-sergeant-vadym-activity-7045965954194784256-D_hH?utm_source=share&utm_medium=member_desktop',
  },

  share: {
    english: 'Share me',
    ukrainian: 'Поділитися',
  },

  giveHope: {
    english: 'Give Hope!',
    ukrainian: 'Дати Надію!',
  },

  videoButton: {
    english: 'get better known',
    ukrainian: ' get better known ',
  },
}

const donatePage = {
  description1: {
    english: 'All charitable contributions are tax-deductible.',
    ukrainian: 'All charitable contributions are tax-deductible.',
  },
  description3: {
    english:
      'Strong support from community volunteers and partners around the globe allowed us to cap our administrative expenses',
    ukrainian:
      'Strong support from community volunteers and partners around the globe allowed us to cap our administrative expenses',
  },
  coloredText: {
    english: 'under 8%',
    ukrainian: 'under 8%',
  },
  nonprofitOrganization: {
    english: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
    ukrainian: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
  },
  sendChecks: {
    english: 'Please send checks to:',
    ukrainian: 'Please send checks to:',
  },
  address: {
    english:
      'Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America',
    ukrainian:
      'Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America',
  },
  email: 'info@protezfoundation.com',
  madeBy: '2024 © Made by DITA GROUP Inc.',
}

export default function VadymFedorov() {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <>
      <Header layout="protezPage" ancorLinks={false} arrowUp={false} />
      <main>
        <SmokeWrapper>
          <Section className={style.section}>
            <div className={style.card}>
              <div className={style.imageContainer}>
                <ProtezImage
                  src={`vadymFedorovPage/vadymFedorov.png`}
                  alt={'vadymFedorov'}
                  className={style.image}
                  width={1306}
                  height={1890}
                />
              </div>
              <div className={style.contentContainer}>
                <div className={style.descriptionContainer}>
                  <div className={style.logoContainer}>
                    {icons.titles[veteransSection.veteran.icon as keyof typeof icons.titles][lang](
                      style.veteranLogo
                    )}
                    <Body className={style.ageRank}>{veteransSection.veteran.ageRank[lang]}</Body>
                  </div>
                  <H3 className={style.cardTitle}>{veteransSection.veteran.title[lang]}</H3>
                  <Body>{veteransSection.veteran.text[lang]}</Body>
                </div>

                <div className={style.donationContainer}>
                  <div className={style.left}>
                    <div className={style.aboveDivider}>
                      <Body large={width > 1180} className={style.description}>
                        <span className={style.block}>{donatePage.description1[lang]}</span>
                      </Body>
                      <Body large={width > 1180}>
                        {donatePage.description3[lang]}{' '}
                        <span className={style.redText}>{donatePage.coloredText[lang]}</span>
                      </Body>
                      <Body>{donatePage.nonprofitOrganization[lang]}</Body>
                    </div>

                    <Divider className={style.divider} />
                    <div className={style.belowDivider}>
                      <div>
                        <Body className={style.descTitle}>{donatePage.sendChecks[lang]}</Body>
                        <Body className={style.descAddress}>{donatePage.address[lang]}</Body>
                      </div>
                      <Body className={style.descTitle}>{donatePage.email}</Body>
                    </div>
                  </div>
                  <div className={style.right}>
                    {/* @ts-ignore @eslint-disable-next-line */}
                    <Script src="https://donorbox.org/widget.js" paypalExpress="false" />
                    <iframe
                      src="https://donorbox.org/embed/website-donation-64"
                      name="donorbox"
                      seamless={true}
                      className={style.donationForm}
                      style={{
                        maxWidth: 425,
                        minWidth: 250,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </SmokeWrapper>
      </main>
      <Footer layout="protezPage" />
    </>
  )
}
