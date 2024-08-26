import { useRef, forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Slider from 'react-slick'

import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Image from 'next/image'
import ProtezButton from '@/components/ProtezButton'
import Section from '@/components/Section'
import { ProtezIDs } from '../consts'

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

const MarchCard = ({
  href,
  photoSrc,
  title,
}: {
  href: string
  photoSrc: string
  title: string
}) => {
  return (
    <a href={href} className={style.merchCardContainer} target="blank">
      <Image
        src={photoSrc}
        alt={title}
        width={372}
        height={374}
        className={`${style.merchCardPicture}`}
      />
    </a>
  )
}

const Merch = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()

  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          centerMode: true,

          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  }

  return (
    <Section className={style.merch} id={ProtezIDs.Merch} ref={ref}>
      <TextAppearanceWrapper className={style.titleWrapper}>
        {icons.protezMERCHlogo.desktop[lang](style.title)}
        <ProtezButton
          as="link"
          href="/"
          variant="primary-black"
          arrow
          className={style.viewAllButton}
          target="_blank"
        >
          <span className={style.buttonText}>{merchSection.viewAllMerch[lang]}</span>
        </ProtezButton>
      </TextAppearanceWrapper>

      <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
        {merchSection.cards.map((element, index) => (
          <div key={index}>
            <MarchCard
              href={element.link}
              photoSrc={`/protez/protezPage/merch/${element.image}`}
              title={element.title}
            />
          </div>
        ))}
      </Slider>
    </Section>
  )
})

Merch.displayName = 'Merch'
export default Merch
