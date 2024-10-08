'use client'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import style from './style.module.css'
import NewsCard from '@/sections/previous/News/components/NewsCard'
import { icons } from './icons'
import Slider from 'react-slick'
import texts from '@/texts&svg'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { SingleNews } from '@/utils/parsers'

const News = ({ news }: { news: SingleNews[] }) => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const sliderRef = useRef<Slider & React.Component>(null)
  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,

          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  }

  return (
    <section className={`${style.section} section `} id="news">
      <div className={style.container}>
        <TextAppearanceWrapper className={style.logoContainer}>
          {icons.wereInNewsLogo[lang]('svgTextBlock')}
        </TextAppearanceWrapper>
        <div className={style.newsContainer}>
          <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
            {news.map((card, index) => (
              <div key={index}>
                <NewsCard
                  link={card.link}
                  photo={card.image}
                  date={card.date}
                  address={card.address}
                  logo={card.logo}
                  title={card.title}
                  text={card.text}
                  short={index % 2 === 0 || width < 480}
                />
              </div>
            ))}
          </Slider>
          <button onClick={gotoNext} className={style.nextSlideButton}>
            {texts.veterans.next[lang]}
          </button>
        </div>
      </div>
    </section>
  )
}

export default News
