import { useRef, forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Slider from 'react-slick'

import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Image from 'next/image'
import ProtezButton from '@/components/ProtezButton'
import Section from '@/components/Section'
import { ProtezIDs } from '../../../../app/consts'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const merchSection = {
  viewAllMerch: {
    english: 'View all merch',
    ukrainian: 'View all merch',
  },
  currency: {
    value: 'USD',
    symbol: '$',
  },
  cards: [
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
  ],
}

const Merch = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

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
          centerPadding: '20px',
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Section className={style.section} id={ProtezIDs.Merch} ref={ref}>
      <TextAppearanceWrapper className={style.titleWrapper}>
        {icons.protezMERCHlogo.desktop[lang](style.title)}
        {isDesktopLayout && (
          <ProtezButton
            squared
            as="link"
            href="/"
            variant="primary-black"
            arrow
            className={style.viewAllButton}
            target="_blank"
          >
            <span className={style.buttonText}>{merchSection.viewAllMerch[lang]}</span>
          </ProtezButton>
        )}
      </TextAppearanceWrapper>

      <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
        {merchSection.cards.map((element, index) => (
          <div key={index}>
            <div className={style.cardWrapper}>
              <a href={element.link} className={style.card} target="blank">
                <Image
                  // TODO: remove after review
                  src={`/protez/protezPage/merch/${element.image}`}
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

      {!isDesktopLayout && (
        <div className={style.buttonWrapper}>
          <ProtezButton
            squared
            as="link"
            href="/"
            variant="primary-black"
            arrow
            className={style.viewAllButton}
            target="_blank"
          >
            <span className={style.buttonText}>{merchSection.viewAllMerch[lang]}</span>
          </ProtezButton>
        </div>
      )}
    </Section>
  )
})

Merch.displayName = 'Merch'
export default Merch
