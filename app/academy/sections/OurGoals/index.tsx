import { forwardRef, useRef } from 'react'

import ProtezImage from '@/components/ProtezImage'

import Slider from 'react-slick'

import AcademySection from '@academy/components/AcademySection'

import SliderNavigation, {
  SliderPrevButton,
  SliderNextButton,
} from '@academy/components/SliderNavigation'

import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { icons } from './icons'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const cards = [
  {
    icon: 'feedback-message.svg',
    text: 'Розвиток сучасної системи освіти для фахівців у сфері протезування, ортезування та реабілітації',
  },
  {
    icon: 'feedback-message.svg',
    text: 'Впровадження міжнародних стандартів (ICF, ISPO, доказова практика) в українську клінічну роботу',
  },
  {
    icon: 'document-bookmark.svg',
    text: 'Підвищення кваліфікації мультидисциплінарних команд через практичне навчання',
  },
  {
    icon: 'caring-hands.svg',
    text: 'Підтримка пацієнтів через покращення якості протезування та реабілітаційного супроводу',
  },
  {
    icon: 'graduation-cap.svg',
    text: 'Розвиток інновацій, технологій та науково-практичних рішень у сфері',
  },
  {
    icon: 'mentorship.svg',
    text: 'Побудова партнерств з українськими та міжнародними організаціями',
  },
  {
    icon: 'team-circle.svg',
    text: 'Формування професійної спільноти та обміну досвідом між фахівцями',
  },
]

const OurGoals = forwardRef<HTMLDivElement>(function (_, ref) {
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current?.slickPrev()
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1366, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <AcademySection ref={ref} id={AcademyIDs.OurGoals} className={style.academyGoals}>
      <TextAppearanceWrapper className={style.container}>
        {icons.goalsLogo.desktop(style.title)}
        <SliderNavigation>
          <SliderPrevButton onClick={gotoPrev} />
          <SliderNextButton onClick={gotoNext} />
        </SliderNavigation>
      </TextAppearanceWrapper>

      <div className={style.sliderWrapper}>
        <div className={style.slider}>
          <Slider {...settings} ref={sliderRef}>
            {cards.map((item, index) => (
              <div key={index}>
                <div className={style.card}>
                  <ProtezImage
                    src={`academyPage/icons/${item.icon}`}
                    alt={item.icon}
                    width={48}
                    height={48}
                    className={style.icon}
                  />
                  <p className={style.cardDesc}>{item.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  OurGoals.displayName = 'OurGoals'
}

export default OurGoals
