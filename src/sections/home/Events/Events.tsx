import { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Section from '@/components/Section'

import style from './style.module.scss'
import { icons } from './icons'

import Slider from 'react-slick'
import { forwardRef } from 'react'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { ProtezIDs } from '@/consts'
import ProtezImage from '@/components/ProtezImage'
import { modifyAndSortEvents } from './utils'
import { EventsProps } from './types'

const Events = forwardRef<HTMLDivElement, EventsProps>(function ({ events }, ref) {
  const sortedEvents = modifyAndSortEvents(events)

  const { lang } = useLanguage()
  // const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    // centerMode: false,
    centerMode: true, // Enable center mode for desktop too
    centerPadding: '0px', // No padding for desktop
    initialSlide: 0, // Start with slide 0

    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '53px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          // centerMode: false,
        },
      },

      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          // centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          centerPadding: '22px',
        },
      },
    ],

    // beforeChange: (_current: number, next: number) => setActiveSlide(next),
  }
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <Section ref={ref} id={ProtezIDs.Events} className={style.events}>
      <ProtezImage
        src="events-background-Ukraine.png"
        alt="Ukrainian flag"
        width={1920}
        height={1080}
        className={style.backgroundImage}
      />
      <div className={style.titleWrapper}>
        {width < 1024
          ? icons.eventsLogo.mobile[lang](style.title)
          : icons.eventsLogo.desktop[lang](style.title)}
      </div>

      <TextAppearanceWrapper className={style.sliderWrapper}>
        <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
          {sortedEvents.map((card, index) => {
            const slideClass = ''

            // if (index === (activeSlide + 2) % sortedEvents.length && width > 1500) {
            //   slideClass = style.centerSlide
            // } else if (index === activeSlide && width > 1024 && width < 1500) {
            //   slideClass = style.centerSlide
            // } else if (
            //   index === (activeSlide + 1) % sortedEvents.length &&
            //   width > 600 &&
            //   width < 1024
            // ) {
            //   slideClass = style.centerSlide
            // } else if (index === activeSlide && width < 600) slideClass = style.centerSlide

            return (
              <div key={index}>
                <div className={`${style.cardWrapper} ${slideClass}`}>
                  <a href={card.link} target="blank" className={style.card}>
                    <ProtezImage
                      src={card.photo}
                      alt="events picture"
                      width={340}
                      height={480}
                      className={style.cardPicture}
                      external
                    />

                    <div className={style.cardDataBlock}>
                      <div className={style.cardDateAndStatus}>
                        {card.upcoming ? (
                          <span className={`${style.cardStatus} ${style.upcoming}`}>
                            Upcoming event
                          </span>
                        ) : (
                          <span className={`${style.cardStatus} ${style.past}`}>Past event</span>
                        )}

                        <span className={style.cardDate}>{card.date}</span>
                      </div>

                      <h3 className={style.cardTitle}>{card.title}</h3>

                      <div className={style.locationWrapper}>
                        {icons.location(style.locationIcon)}
                        <span className={style.locationText}>{card.location}</span>
                        {width < 600 && (
                          <span className={style.locationButton}>
                            {icons.arrowTop(style.iconArrow)}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </Slider>
        {width > 600 && (
          <>
            <button className={style.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(style.arrowLeft)}
            </button>
            <button className={style.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(style.arrowRight)}
            </button>
          </>
        )}
      </TextAppearanceWrapper>
    </Section>
  )
})

export default Events
