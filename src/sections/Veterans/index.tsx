import { useRef, useState } from 'react'

import { Languages, BilingualText } from '@/types'
import SquareButton from '@/components/SquareButton'
import { useLanguage } from '@/contexts/LanguageContext'

import style from './Veterans.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'

import texts from '@/texts&svg'

interface Veteran {
  ageRank: BilingualText
  name: BilingualText
  surname: BilingualText
  title: BilingualText
  text: BilingualText
  img: string
  icon: keyof typeof icons.titles
  video: string
  url: string
  videoLink: string
  facebook: string
  instagram: string
  linkedin: string
}

const Veterans = () => {
  const { lang } = useLanguage()
  const [iframeData, setIframeData] = useState({ opened: false, url: '' })

  const sliderRef = useRef<Slider & React.Component>(null)
  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }

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

  const veteransArray = texts.veterans.veterans as Veteran[]

  return (
    <>
      <section className={`${style.section} section`} id="veterans">
        <div className={style.sliderWrapper}>
          <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
            {veteransArray.map((element, index) => (
              <div key={index}>
                <div className={style.sliderCard}>
                  <div className={style.leftSide}>
                    <TextAppearanceWrapper className={style.logoAndRankContainer}>
                      {icons.titles[element.icon][lang](`${style.veteranLogo} svgTextBlock`)}
                      <h5 className={`h5 ${style.ageRank}`}>{element.ageRank[lang]}</h5>
                    </TextAppearanceWrapper>
                    <TextAppearanceWrapper className={`h2 ${style.cardTitle}`}>
                      {element.title[lang]}
                    </TextAppearanceWrapper>
                    <TextAppearanceWrapper
                      className={`p ${style.cardText} ${lang === Languages.Ukrainian && style.ua}`}
                    >
                      {element.text[lang]}
                    </TextAppearanceWrapper>
                    <div className={style.shareMe}>
                      <div className={`${style.buttonsList}`}>
                        <SquareButton className={style.squareButton} link blank href={element.url}>
                          {texts.veterans.giveHope[lang]}
                        </SquareButton>
                        <div className={style.iconsList}>
                          <a target="blank" href={element.linkedin as string}>
                            {icons.iconLinkedin()}
                          </a>
                          <a target="blank" href={element.facebook as string}>
                            {icons.iconFacebook()}
                          </a>
                          <a target="blank" href={element.instagram as string}>
                            {icons.iconInstagram()}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.rightSide}>
                    <Image
                      src={`/veterans/${element.img}`}
                      alt={element.name[lang] + ' ' + element.surname[lang]}
                      className={style.photo}
                      width={1306}
                      height={1890}
                    />

                    <button
                      className={style.roundButton}
                      onClick={() => {
                        setIframeData({ opened: true, url: element.videoLink })
                      }}
                    >
                      {icons[`${element.icon}Icon`](style.spinningName)}
                      {icons.triangle(style.triangle)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <button onClick={gotoNext} className={style.nextSlideButton}>
            {texts.veterans.next[lang]}
          </button>
        </div>
      </section>
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
