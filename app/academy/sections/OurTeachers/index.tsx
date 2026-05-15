import React, { useRef } from 'react'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import AcademySection from '@academy/components/AcademySection'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import ProtezImage from '@/components/ProtezImage'

import styles from './style.module.scss'
import TeacherCard from './TeacherCard'

import Slider from 'react-slick'

import { AcademyIDs } from '../../consts'

const OurTeachers = () => {
  const { width } = useScreenModeAndSize()
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('we-train')

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
        <ProtezImage {...titleDesktop} className={styles.teachersLogo} />
      </TextAppearanceWrapper>
      {width < 600 ? (
        <TextAppearanceWrapper>
          <Slider {...settings} ref={sliderRef} className={styles.slickSlider}>
            {t.ourTeachers.members.map((card, index) => (
              <div className={styles.cardWrapper} key={index}>
                <TeacherCard
                  className={styles.teacherCard}
                  photo={card.photo}
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
            name={card.name}
            position={card.position}
          />
        ))
      )}
    </AcademySection>
  )
}

export default OurTeachers
