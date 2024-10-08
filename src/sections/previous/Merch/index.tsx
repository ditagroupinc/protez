import { useRef, forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

import MarchCard from '@/sections/previous/Merch/MerchCard'

import style from './style.module.scss'
import Slider from 'react-slick'

import { icons } from './icons'

import texts from '@/texts&svg'

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
    <section className={`${style.section} section`} id="merch" ref={ref}>
      <div className={`textContainer ${style.logo}`}>
        {icons.protezMERCHlogo[lang](`svgTextBlock`)}
      </div>

      <Slider ref={sliderRef} {...settings} className={style.slickSlider}>
        {texts.merch.cards.map((element, index) => (
          <div key={index}>
            <MarchCard
              href={element.link}
              photoSrc={`/merch/${element.image}`}
              title={element.title}
              prevPrice={element.previousPrice}
              price={element.price}
              currency={texts.merch.currency.symbol}
            />
          </div>
        ))}
      </Slider>
    </section>
  )
})

Merch.displayName = 'Merch'
export default Merch
