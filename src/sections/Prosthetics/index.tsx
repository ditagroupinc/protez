'use client'

import Card from '@/components/Card'
import style from './style.module.scss'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import Image from 'next/image'
import { icons } from './icons'
import VideoAndFilter from '@/components/VideoAndFilter'
import texts from '@/texts&svg'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const iconsArr = [icons.iconIntegration, icons.iconHeart, icons.iconPeople]

const Prosthetics = () => {
  const { lang } = useLanguage()
  const { tabletLarge, tablet, mobile } = useScreenModeAndSize()
  const renderCards = () => {
    return Object.keys(texts.prosthetics.cards).map((key, i) => (
      <Card
        key={i}
        icon={iconsArr[i]}
        text={texts.prosthetics.cards[key as keyof typeof texts.prosthetics.cards][lang]}
        reverse
      />
    ))
  }

  return (
    <section className={`${style.section} section `} id="prosthetics">
      <VideoAndFilter src={'protez-foundation.mp4'} />

      <Image
        src="/img-ukraine-map.png"
        objectFit="contain"
        alt="map of Ukraine"
        width={2560}
        height={1440}
        className={`${style.ukrainianMap}`}
      />

      {tabletLarge || tablet || mobile ? (
        <>
          {icons.flag(style.flag)}
          <div className={style.flexContainer}>
            <div className={`${style.leftSide}`}>
              <TextAppearanceWrapper className={style.title}>
                {icons.prostheticsLogo.tablet[lang](style.logoTablet)}
              </TextAppearanceWrapper>
              <div className={`${style.text}`}>
                <TextAppearanceWrapper className={`h2 ${lang === Languages.Ukrainian && style.ua}`}>
                  {texts.prosthetics.paragraph.top[lang]}
                </TextAppearanceWrapper>

                <TextAppearanceWrapper className={`h2 ${lang === Languages.Ukrainian && style.ua}`}>
                  {texts.prosthetics.paragraph.bottom[lang]}
                </TextAppearanceWrapper>
              </div>
            </div>
            <div className={`${style.rightSide}`}>{renderCards()}</div>
          </div>
        </>
      ) : (
        <div className={`${style.block}`}>
          <TextAppearanceWrapper className={style.title}>
            {!tabletLarge
              ? icons.prostheticsLogo.desktop[lang]()
              : icons.prostheticsLogo.tablet[lang](style.logoTablet)}
          </TextAppearanceWrapper>
          <div className={`${style.text} ${!tabletLarge ? 'h2' : 'h5'} `}>
            <TextAppearanceWrapper>{texts.prosthetics.paragraph.top[lang]}</TextAppearanceWrapper>
            <br />
            <TextAppearanceWrapper>
              {texts.prosthetics.paragraph.bottom[lang]}
            </TextAppearanceWrapper>
          </div>
          {renderCards()}
        </div>
      )}
    </section>
  )
}

export default Prosthetics
