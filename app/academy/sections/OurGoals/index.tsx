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
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

const OurGoals = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('goals')
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
        <ProtezImage {...titleDesktop} className={style.title} />
        <SliderNavigation className={style.sliderNavigation}>
          <SliderPrevButton onClick={gotoPrev} />
          <SliderNextButton onClick={gotoNext} />
        </SliderNavigation>
      </TextAppearanceWrapper>

      <div className={style.sliderWrapper}>
        <div className={style.slider}>
          <Slider {...settings} ref={sliderRef}>
            {t.goals.items.map((item, index) => (
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
