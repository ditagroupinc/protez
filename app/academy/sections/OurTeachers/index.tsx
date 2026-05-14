import React, { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import AcademySection from '@academy/components/AcademySection'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './style.module.scss'
import TeacherCard from './TeacherCard'
import { icons } from './icons.js'

import Slider from 'react-slick'

import { AcademyIDs } from '../../consts'

const OurTeachers = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const t = useAcademyTexts()

  const sliderRef = useRef(null)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',

    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <AcademySection id={AcademyIDs.OurTeachers} className={styles.ourTeachers}>
      <TextAppearanceWrapper className={styles.titleCell}>
        {icons.ourTeachersLogo.desktop[lang](styles.teachersLogo)}
      </TextAppearanceWrapper>
      {width < 600 ? (
        <TextAppearanceWrapper>
          <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
            {t.ourTeachers.members.map((card, index) => (
              <div className={styles.cardWrapper} key={index}>
                <TeacherCard
                  className={styles.teacherCard}
                  photo={card.photo}
                  links={{}}
                  name={card.name}
                  position={card.position}
                />
              </div>
            ))}
          </Slider>
        </TextAppearanceWrapper>
      ) : (
        t.ourTeachers.members.map((card, index) => (
          <TeacherCard
            className={styles.teacherCard}
            key={index}
            photo={card.photo}
            links={{}}
            name={card.name}
            position={card.position}
          />
        ))
      )}
    </AcademySection>
  )
}

export default OurTeachers
