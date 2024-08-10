import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'

// import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '../consts'
import { Body, H3 } from '@/components/Typography'
import ProtezButton from '@/components/ProtezButton'

const veteransText = {
  veterans: [
    {
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
  ],
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

const Veterans = () => {
  const { lang } = useLanguage()
  const [iframeData, setIframeData] = useState({ opened: false, url: '' })

  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  const veteransArray = [veteransText.veterans[0], veteransText.veterans[0]]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <>
      <Section id={ProtezIDs.Veterans} className={style.section}>
        <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
          {veteransArray.map((slide, index) => (
            <div key={index} className={style.cardWrapper}>
              <div className={style.card}>
                <div className={style.left}>
                  <div className={style.logoContainer}>
                    {icons.titles[slide.icon as keyof typeof icons.titles][lang](style.veteranLogo)}
                    <Body large className={style.ageRank}>
                      {slide.ageRank[lang]}
                    </Body>
                  </div>
                  <H3 className={style.cardTitle}>{slide.title[lang]}</H3>
                  <Body className={style.cardText} large>
                    {slide.text[lang]}
                  </Body>
                  <div className={style.buttonsContainer}>
                    {/* <TextAppearanceWrapper className={style.buttonsContainer}> */}
                    <div className={style.iconsContainer}>
                      <a target="blank" href={slide.linkedin as string}>
                        {icons.iconLinkedin(style.icon)}
                      </a>
                      <a target="blank" href={slide.facebook as string}>
                        {icons.iconFacebook(style.icon)}
                      </a>
                      <a target="blank" href={slide.instagram as string}>
                        {icons.iconInstagram(style.icon)}
                      </a>
                    </div>
                    <ProtezButton
                      as="link"
                      target="_blank"
                      href={slide.url}
                      variant="secondary-white"
                      arrow
                    >
                      {veteransText.giveHope[lang]}
                    </ProtezButton>

                    <div className={style.sliderNavigation}>
                      <button className={style.sliderButton} onClick={gotoPrev}>
                        {icons.arrowLeft(style.arrow)}
                      </button>
                      <button className={style.sliderButton} onClick={gotoNext}>
                        {icons.arrowRight(style.arrow)}
                      </button>
                    </div>
                    {/* </TextAppearanceWrapper> */}
                  </div>
                </div>

                <div className={style.right}>
                  <Image
                    // TODO: remove after review
                    src={`/protez/protezPage/veterans/${slide.img}`}
                    alt={slide.name[lang] + ' ' + slide.surname[lang]}
                    className={style.image}
                    width={1306}
                    height={1890}
                  />

                  <button
                    className={style.roundButton}
                    onClick={() => {
                      setIframeData({ opened: true, url: slide.videoLink })
                    }}
                  >
                    {icons[`${slide.icon as keyof typeof icons.titles}Icon`](style.spinningName)}
                    {icons.triangle(style.triangle)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Section>
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

export default Veterans
