'use client'

import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@/components/AcademySection'

import style from './style.module.scss'

import { AcademyAboutIDs } from '@academy/about/consts'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

interface Props {
  id: AcademyAboutIDs
}

const AboutUs = forwardRef<HTMLDivElement, Props>(function ({ id }, ref) {
  const t = useTranslations('academyAbout.mission')
  const { desktop: titleDesktop } = useAcademyTitle('about-us')

  return (
    <AcademySection ref={ref} id={id} className={style.academyGoals}>
      <div className={style.container}>
        <div className={style.right}>
          <TextAppearanceWrapper>
            <ProtezImage {...titleDesktop} className={style.title} priority />
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <p className={style.description}>{t('statement')}</p>
          </TextAppearanceWrapper>
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
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AboutUs.displayName = 'AboutUs'
}

export default AboutUs
