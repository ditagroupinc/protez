import { useRef, ReactElement } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

import icons from './icons'
import Slider from 'react-slick'

import PressReleaseCard from './components/PressReleaseCard'
import texts from '@/texts&svg'
import { SinglePressRelease } from '@/utils/parsers'

const PressRelease = ({ pressReleases }: { pressReleases: SinglePressRelease[] }) => {
  const { lang } = useLanguage()
  const sliderRef = useRef<Slider & React.Component>(null)
  const gotoNext = () => {
    sliderRef.current?.slickNext()
  }

  const settings = {
    dots: true,
    appendDots: (dots: ReactElement) => (
      <>
        <div className={style.sliderNavigation}>
          <button onClick={gotoNext} className={style.nextSlideButton}>
            {texts.pressRelease.next[lang]}
          </button>
          <ul className={style.slickDots}>{dots}</ul>
        </div>
      </>
    ),
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,

    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <section className={`${style.section} section`} id="pressRelease">
      <TextAppearanceWrapper className={style.logo}>
        {icons.pressReleaseLogo.desktop[lang](`svgTextBlock`)}
      </TextAppearanceWrapper>

      <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
        {pressReleases.map((pressRelease, index) => (
          <div className={style.sliderSlidePadding} key={index}>
            <PressReleaseCard
              image={pressRelease.image}
              date={pressRelease.date}
              title={pressRelease.title}
              text={pressRelease.text}
            />
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default PressRelease
