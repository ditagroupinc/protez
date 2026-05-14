import ProtezImage from '@/components/ProtezImage'

import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import AcademySection from '@academy/components/AcademySection'

import SliderNavigation, {
  SliderPrevButton,
  SliderNextButton,
} from '@academy/components/SliderNavigation'

import styles from './styles.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { forwardRef } from 'react'

import { AcademyIDs } from '../../consts'

const WeAreInNews = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const t = useAcademyTexts()
  const newsCards = t.weAreInNews.items
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          centerPadding: '20px',
        },
      },
    ],

    beforeChange: (_current: number, next: number) => setActiveSlide(next),
  }
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <AcademySection ref={ref} id={AcademyIDs.WeAreInNews} className={styles.weAreInNews}>
      <TextAppearanceWrapper>
        {width < 600
          ? icons.weAreInNewsLogo.mobile[lang](styles.title)
          : icons.weAreInNewsLogo.desktop[lang](styles.title)}
      </TextAppearanceWrapper>
      <div className={styles.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
          {newsCards.map((card, index) => {
            let slideClass = ''

            switch (index) {
              case (activeSlide + 1) % newsCards.length:
                slideClass = styles.centerSlide
                break
              case activeSlide:
                slideClass = styles.leftSlide
                break
              default:
                slideClass = ''
            }

            return (
              <div key={index}>
                <div className={`${styles.cardWrapper} ${slideClass}`}>
                  <a href={card.link} target="blank" className={styles.card}>
                    <ProtezImage
                      src={`${card.photo}`}
                      alt={t.weAreInNews.imageAlt}
                      width={488}
                      height={520}
                      className={`${styles.cardPicture}`}
                    />
                    <TextAppearanceWrapper className={styles.cardDataBlock}>
                      <div className={styles.cardDate}>
                        <span>{card.date}</span>|<span>{card.address}</span>
                      </div>

                      <ProtezImage
                        src={`${card.logo}`}
                        alt={t.weAreInNews.imageAlt}
                        width={488}
                        height={520}
                        className={`${styles.cardLogo}`}
                      />

                      <h3 className={styles.cardTitle}>{card.title}</h3>

                      <p className={styles.cardText}>{card.text}</p>
                    </TextAppearanceWrapper>
                    {icons.arrow(styles.iconArrow)}
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
        {width > 600 && (
          <SliderNavigation className={styles.sliderNavigation}>
            <SliderPrevButton onClick={gotoPrev} />
            <SliderNextButton onClick={gotoNext} />
          </SliderNavigation>
        )}
      </div>
    </AcademySection>
  )
})

export default WeAreInNews
