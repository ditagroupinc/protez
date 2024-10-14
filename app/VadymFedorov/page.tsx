'use client'

import { useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Image from 'next/image'

import { icons } from './icons'
import Section from '@/components/Section'
import { Body, H3 } from '@/components/Typography'
import ProtezButton from '@/components/ProtezButton'
import { BilingualText } from '@/types'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import ProtezHeader from '@/sections/protez/ProtezHeader'
import Footer from '@/sections/Footer'

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

export default function VadymFedorov() {
  const { lang } = useLanguage()
  const [iframeData, setIframeData] = useState({ opened: false, url: '' })
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  return (
    <>
      <ProtezHeader ancorLinks={false} arrowUp={false} />
      <main>
        <Section className={style.section}>
          {isDesktopLayout ? (
            <div className={style.card}>
              <div className={style.left}>
                <div className={style.logoContainer}>
                  {icons.titles[veteransSection.veteran.icon as keyof typeof icons.titles][lang](
                    style.veteranLogo
                  )}
                  <Body large={isDesktopLayout} className={style.ageRank}>
                    {veteransSection.veteran.ageRank[lang]}
                  </Body>
                </div>
                <H3 className={style.cardTitle}>{veteransSection.veteran.title[lang]}</H3>
                <Body className={style.cardText} large={isDesktopLayout}>
                  {veteransSection.veteran.text[lang]}
                </Body>

                <div className={style.buttonsContainer}>
                  <div className={style.linksSliderWrapper}>
                    <div className={style.linksSlide}>
                      <div className={style.iconsContainer}>
                        <a target="blank" href={veteransSection.veteran.linkedin as string}>
                          {icons.iconLinkedin(style.icon)}
                        </a>
                        <a target="blank" href={veteransSection.veteran.facebook as string}>
                          {icons.iconFacebook(style.icon)}
                        </a>
                        <a target="blank" href={veteransSection.veteran.instagram as string}>
                          {icons.iconInstagram(style.icon)}
                        </a>
                      </div>
                      <ProtezButton
                        as="link"
                        target="_blank"
                        href={veteransSection.veteran.url}
                        variant="secondary-white"
                        className={style.protezButton}
                      >
                        {veteransSection.giveHope[lang]}
                      </ProtezButton>
                    </div>
                  </div>

                  {/* <div className={style.sliderNavigation}>
                  <button className={style.sliderButton} onClick={gotoPrev}>
                    {icons.arrowLeft(style.arrow)}
                  </button>
                  <button className={style.sliderButton} onClick={gotoNext}>
                    {icons.arrowRight(style.arrow)}
                  </button>
                </div> */}
                </div>
              </div>
              <div className={style.right}>
                <div className={style.imageSlideWrapper}>
                  <Image
                    // TODO: remove after review
                    src={`/protez/protezPage/veterans/${veteransSection.veteran.img}`}
                    alt={
                      veteransSection.veteran.name[lang] +
                      ' ' +
                      veteransSection.veteran.surname[lang]
                    }
                    className={style.image}
                    width={1306}
                    height={1890}
                  />

                  <button
                    className={style.roundButton}
                    onClick={() => {
                      setIframeData({ opened: true, url: veteransSection.veteran.videoLink })
                    }}
                  >
                    {icons[`${veteransSection.veteran.icon as keyof typeof icons.titles}Icon`](
                      style.spinningName
                    )}
                    {icons.triangle(style.triangle)}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={style.card}>
                <div className={style.right}>
                  <div className={style.imageSlideWrapper}>
                    <Image
                      // TODO: remove after review
                      src={`/protez/protezPage/veterans/${veteransSection.veteran.img}`}
                      alt={
                        veteransSection.veteran.name[lang] +
                        ' ' +
                        veteransSection.veteran.surname[lang]
                      }
                      className={style.image}
                      width={1306}
                      height={1890}
                    />

                    <button
                      className={style.roundButton}
                      onClick={() => {
                        setIframeData({ opened: true, url: veteransSection.veteran.videoLink })
                      }}
                    >
                      {icons[`${veteransSection.veteran.icon as keyof typeof icons.titles}Icon`](
                        style.spinningName
                      )}
                      {icons.triangle(style.triangle)}
                    </button>
                  </div>
                </div>
                <div className={style.left}>
                  <div>
                    <div className={style.logoContainer}>
                      {icons.titles[veteransSection.veteran.icon as keyof typeof icons.titles][
                        lang
                      ](style.veteranLogo)}
                      <Body large={isDesktopLayout} className={style.ageRank}>
                        {veteransSection.veteran.ageRank[lang]}
                      </Body>
                    </div>
                    <H3 className={style.cardTitle}>{veteransSection.veteran.title[lang]}</H3>
                    <Body className={style.cardText} large={isDesktopLayout}>
                      {veteransSection.veteran.text[lang]}
                    </Body>
                  </div>

                  <div className={style.linksSlide}>
                    <div className={style.iconsContainer}>
                      <a target="blank" href={veteransSection.veteran.linkedin as string}>
                        {icons.iconLinkedin(style.icon)}
                      </a>
                      <a target="blank" href={veteransSection.veteran.facebook as string}>
                        {icons.iconFacebook(style.icon)}
                      </a>
                      <a target="blank" href={veteransSection.veteran.instagram as string}>
                        {icons.iconInstagram(style.icon)}
                      </a>
                    </div>
                    <ProtezButton
                      as="link"
                      target="_blank"
                      href={veteransSection.veteran.url}
                      variant="secondary-white"
                      className={style.protezButton}
                    >
                      {veteransSection.giveHope[lang]}
                    </ProtezButton>
                  </div>
                </div>
              </div>

              {/* <div className={style.sliderNavigation}>
              <button className={style.sliderButton} onClick={gotoPrev}>
                {icons.arrowLeft(style.arrow)}
              </button>
              <button className={style.sliderButton} onClick={gotoNext}>
                {icons.arrowRight(style.arrow)}
              </button>
            </div> */}
            </>
          )}
        </Section>
      </main>
      <Footer />

      {iframeData.opened && (
        <>
          <div className={style.mask} onClick={() => setIframeData({ opened: false, url: '' })} />
          <iframe
            className={style.iFrame}
            src={iframeData.url}
            width="400"
            height="713"
            scrolling="no"
            // frameborder="0"
            // allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={true}
          />
          <button
            className={style.closeVideo}
            onClick={() => setIframeData({ opened: false, url: '' })}
          >
            {icons.closeVideo()}
          </button>
        </>
      )}
    </>
  )
}
