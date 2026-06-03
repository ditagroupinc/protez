'use client'

import { useRef, forwardRef, ForwardedRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import style from './style.module.scss'
import Slider from '@/islands/SlickCarousel'

import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { SeeAllButton } from '@/components/Button'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import ProtezImage from '@/components/ProtezImage'

const merchCards = [
  {
    link: 'https://www.protezmerch.com/product/t-shirt-next-level-apparel-/6?cs=true&cst=custom',
    title: 'T-shirt Next Level Apparel®',
    image: 't-shirt.png',
  },
  {
    link: 'https://www.protezmerch.com/product/hooded-sweatshirt-port-company-/5?cs=true&cst=custom',
    title: 'Hooded Sweatshirt Port & Company®',
    image: 'hoodie.png',
  },
  {
    link: 'https://www.protezmerch.com/product/new-era-original-fit-snapback-trucker-cap/4?cs=true&cst=custom',
    title: 'New Era® Original Fit Snapback Trucker Cap',
    image: 'truckerCap.png',
  },
  {
    link: 'https://www.protezmerch.com/product/boat-tote-bag/3?cs=true&cst=custom',
    title: 'Boat Tote Bag',
    image: 'boatToteBag.png',
  },
  {
    link: 'https://www.protezmerch.com/product/rambler-18-oz-water-bottle/2?cs=true&cst=custom',
    title: 'RAMBLER® 18 OZ WATER BOTTLE',
    image: '18ozWaterBottle.png',
  },
  {
    link: 'https://www.protezmerch.com/product/rambler-20-oz-tumbler/1?cs=true&cst=custom',
    title: 'RAMBLER® 20 OZ TUMBLER',
    image: '20ozTumbler.png',
  },
  {
    link: 'https://www.protezmerch.com/product/bracelet-w-b/10?cs=true&cst=custom',
    title: 'Bracelet W+B',
    image: 'braceletWB.png',
  },
  {
    link: 'https://www.protezmerch.com/product/notepad-pen/7?cs=true&cst=custom',
    title: 'Notepad + Pen',
    image: 'notepadAndPen.png',
  },
]

const Merch = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.merch')

  const sliderRef = useRef(null)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          centerMode: true,
          centerPadding: '24px',
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Section className={style.section} id={ProtezIDs.Merch} ref={ref}>
      <TextAppearanceWrapper className={style.titleWrapper}>
        {icons.protezMERCHlogo.desktop[lang](`${style.title} ${style.titleDesktop}`)}
        {icons.protezMERCHlogo.mobile[lang](`${style.title} ${style.titleMobile}`)}
        <SeeAllButton
          href="https://www.protezmerch.com/"
          className={`${style.viewAllButton} ${style.viewAllButtonTop}`}
        >
          <span className={style.buttonText}>{t('viewAllMerch')}</span>
        </SeeAllButton>
      </TextAppearanceWrapper>

      <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
        {merchCards.map((element, index) => (
          <div key={index}>
            <div className={style.cardWrapper}>
              <a href={element.link} className={style.card} target="blank">
                <ProtezImage
                  src={`protezPage/merch/${element.image}`}
                  alt={element.title}
                  width={372}
                  height={372}
                  className={`${style.cardPicture}`}
                />
              </a>
            </div>
          </div>
        ))}
      </Slider>

      <div className={style.buttonWrapper}>
        <SeeAllButton href="https://www.protezmerch.com/" className={style.viewAllButton}>
          <span className={style.buttonText}>{t('viewAllMerch')}</span>
        </SeeAllButton>
      </div>
    </Section>
  )
})

Merch.displayName = 'Merch'
export default Merch
