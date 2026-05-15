import { forwardRef } from 'react'

import Slider from 'react-slick'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@academy/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { DONATE_URL } from '../../consts/links'
import { icons } from './icons'
import Button from '@academy/components/Button'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

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
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('mission-and-values')

  return (
    <AcademySection ref={ref} id={AcademyIDs.MissionAndValues} className={style.academyGoals}>
      <div className={style.container}>
        <div className={style.right}>
          <TextAppearanceWrapper>
            <ProtezImage {...titleDesktop} className={style.title} />
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <p className={style.description}>{t.mission.statement}</p>
          </TextAppearanceWrapper>
          <Button
            as="link"
            href={DONATE_URL}
            variant="normal-black"
            size="big"
            className={style.button}
          >
            {t.mission.button}
            {icons.arrowUp(`${style.arrowUpIcon}`)}
          </Button>
        </div>

        <div className={style.left}>
          <ProtezImage
            src="academyPage/mission-and-values.png"
            alt={t.mission.imageAlt}
            width={720}
            height={520}
            className={style.image}
          />
        </div>
      </div>

      <TextAppearanceWrapper className={style.sliderWrapper}>
        <div className={style.slider}>
          <Slider {...sliderSettings}>
            {t.mission.values.map((item, index) => (
              <div key={index}>
                <div className={style.card}>
                  <ProtezImage
                    src={`academyPage/icons/${item.icon}`}
                    alt={item.icon}
                    width={48}
                    height={48}
                    className={style.icon}
                  />
                  <div className={style.cardContent}>
                    <p className={style.cardTitle}>{item.title}</p>
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
