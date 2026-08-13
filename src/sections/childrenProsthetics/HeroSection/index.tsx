'use client'

import { useRef } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useTranslations } from 'next-intl'
import type SlickSlider from 'react-slick'

import Section from '@/components/Section'
import ProtezImage from '@/components/ProtezImage'
import Button, { MakeDonationButton } from '@/components/Button'
import { ChildrenProstheticsIDs } from '@/consts'
import { useChildrensProstheticsTitle } from '@/hooks/useChildrensProstheticsTitle'
import { useStatsRange } from '@/hooks/useStatsRange'
import type { CurrentMonth } from '@/lib/date'
import SlickCarousel, { type Settings } from '@/islands/SlickCarousel'
import { NEED_A_PROTHESIS_URL } from '@/sections/_shared/Header/config'

import { icons } from './icons'
import style from './style.module.scss'

type Slide = { image: string; alt: string }

const HeroSection = ({ currentMonth }: { currentMonth: CurrentMonth }) => {
  const t = useTranslations('childrenProsthetics')

  const slides = t.raw('hero.slides') as Slide[]
  const statNumber = Number(t.raw('hero.statNumber'))
  const statRange = useStatsRange(currentMonth)

  const title = useChildrensProstheticsTitle('childrens-prosthetics')

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
    <Section id={ChildrenProstheticsIDs.Hero} className={style.section}>
      <div className={style.heroFx} aria-hidden="true">
        <span className={`${style.glow} ${style.g1}`} />
        <span className={`${style.glow} ${style.g2}`} />
        <span className={`${style.glow} ${style.g3}`} />
        <span
          className={style.spark}
          style={{ left: '16%', animationDuration: '10s', animationDelay: '0s' }}
        />
        <span
          className={style.spark}
          style={{ left: '34%', animationDuration: '12s', animationDelay: '3s' }}
        />
        <span
          className={style.spark}
          style={{ left: '52%', animationDuration: '9s', animationDelay: '1.5s' }}
        />
        <span
          className={style.spark}
          style={{ left: '64%', animationDuration: '13s', animationDelay: '5s' }}
        />
      </div>
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
              <div className={style.statLabel}>{t('hero.statLabel')}</div>
              <div className={style.statRange}>{statRange}</div>
            </div>
          </div>

          <p className={style.quote}>{t('hero.quote')}</p>

          <div className={style.ctas}>
            <MakeDonationButton size="normal" variant="primary-teal" />
            <Button
              as="link"
              href={NEED_A_PROTHESIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary-black"
              size="normal"
              arrow
            >
              {t('hero.cta.need')}
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

export default HeroSection
