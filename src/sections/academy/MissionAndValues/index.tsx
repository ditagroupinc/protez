'use client'

import { forwardRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import Slider from '@/islands/SlickCarousel'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '@academy/consts'

import { icons } from './icons'
import Button from '@/components/AcademyButton'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

type MissionValue = { icon: string; title: string; text: string }

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: false,
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

const MissionAndValues = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academy.mission')
  const values = t.raw('values') as MissionValue[]
  const { desktop: titleDesktop } = useAcademyTitle('mission-and-values')
  const locale = useLocale()
  const titleLang = locale === 'uk' ? 'uk' : 'en'

  return (
    <AcademySection ref={ref} id={AcademyIDs.MissionAndValues} className={style.academyGoals}>
      <div className={style.container}>
        <div className={style.right}>
          <TextAppearanceWrapper>
            <ProtezImage {...titleDesktop} className={style.title} />
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <p className={style.description}>{t('statement')}</p>
          </TextAppearanceWrapper>
          <Button
            as="link"
            href="academy/about"
            variant="normal-black"
            size="big"
            className={style.button}
          >
            {t('button')}
            {icons.arrowUp(`${style.arrowUpIcon}`)}
          </Button>
        </div>

        <div className={style.left}>
          <ProtezImage
            src="academyPage/mission-and-values.png"
            alt={t('imageAlt')}
            width={720}
            height={520}
            className={style.image}
          />
        </div>
      </div>

      <TextAppearanceWrapper className={style.sliderWrapper}>
        <div className={style.slider}>
          <Slider {...sliderSettings}>
            {values.map((item, index) => (
              <div key={index}>
                <div className={style.card}>
                  <ProtezImage
                    src={`icons/${item.icon}`}
                    alt={item.icon}
                    width={48}
                    height={48}
                    className={style.icon}
                  />
                  <div className={style.cardContent}>
                    <p className={style.cardTitle} lang={titleLang}>
                      {item.title}
                    </p>
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </TextAppearanceWrapper>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  MissionAndValues.displayName = 'MissionAndValues'
}

export default MissionAndValues
