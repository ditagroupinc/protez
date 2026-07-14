'use client'

import { useRef } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useTranslations } from 'next-intl'
import type SlickSlider from 'react-slick'

import Section from '@/components/Section'
import ProtezImage from '@/components/ProtezImage'
import Button from '@/components/Button'
import { ProtezIDs } from '@/consts'
import { useChildrensProstheticsTitle } from '@/hooks/useChildrensProstheticsTitle'
import SlickCarousel, { type Settings } from '@/islands/SlickCarousel'
import { NEED_A_PROTHESIS_URL } from '@/sections/_shared/Header/config'

import { icons } from './icons'
import style from './style.module.scss'

type Slide = { image: string; alt: string }

const ChildrensProstheticsPromo = () => {
  const t = useTranslations('home.childrensProstheticsPromo')

  const slides = t.raw('slides') as Slide[]
  const statNumber = Number(t.raw('statNumber'))

  const title = useChildrensProstheticsTitle('childrens-prosthetics-dark')

  const sliderRef = useRef<SlickSlider>(null)
  const { ref: countRef, inView: countInView } = useInView({ triggerOnce: true, threshold: 0.4 })

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,
        },
      },
    ],
  }

  return (
    <Section id={ProtezIDs.ChildrensProstheticsPromo} className={style.section}>
      <div className={style.inner}>
        <div className={style.copy}>
          <ProtezImage
            src={title.desktop.src}
            alt={title.desktop.alt}
            width={title.desktop.width}
            height={title.desktop.height}
            className={`${style.title} ${style.titleDesktop}`}
          />
          <ProtezImage
            src={title.mobile.src}
            alt={title.mobile.alt}
            width={title.mobile.width}
            height={title.mobile.height}
            className={`${style.title} ${style.titleMobile}`}
          />

          <div className={style.stat} ref={countRef}>
            <div className={style.statNum}>
              {countInView ? <CountUp end={statNumber} duration={1.2} /> : 0}
            </div>
            <div className={style.statMeta}>
              <div className={style.statLabel}>{t('statLabel')}</div>
              <div className={style.statRange}>{t('statRange')}</div>
            </div>
          </div>

          <p className={style.quote}>{t('quote')}</p>

          <div className={style.ctas}>
            <Button as="link" href="/dytyache-protezuvannya" variant="primary-teal" size="normal">
              {t('cta.learnMore')}
            </Button>
            <Button
              as="link"
              href={NEED_A_PROTHESIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary-white"
              size="normal"
              arrow
            >
              {t('cta.need')}
            </Button>
          </div>
        </div>

        <div className={style.slider}>
          <div className={style.sliderFrame}>
            <SlickCarousel {...settings} ref={sliderRef} className={style.slickSlider}>
              {slides.map((slide, index) => (
                <div key={slide.image} className={style.slide}>
                  <ProtezImage
                    src={`dytyacheProtezuvannyaPage/${slide.image}`}
                    alt={slide.alt}
                    width={800}
                    height={1000}
                    priority={index === 0}
                    className={style.slideImage}
                  />
                </div>
              ))}
            </SlickCarousel>
          </div>
          <div className={style.nav}>
            <button
              type="button"
              className={style.navBtn}
              aria-label="Prev"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              {icons.arrowLeft(style.arrow)}
            </button>
            <button
              type="button"
              className={style.navBtn}
              aria-label="Next"
              onClick={() => sliderRef.current?.slickNext()}
            >
              {icons.arrowRight(style.arrow)}
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ChildrensProstheticsPromo
