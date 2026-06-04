'use client'

import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '@academy/consts'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

const OurSponsors = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academy.ourSponsors')
  const items = t.raw('items') as string[]
  const { desktop: titleDesktop } = useAcademyTitle('our-sponsors')

  return (
    <AcademySection ref={ref} id={AcademyIDs.OurSponsors} className={style.ourSponsors}>
      <TextAppearanceWrapper>
        <ProtezImage {...titleDesktop} className={style.title} />
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={style.cardsContainer}>
        {items.map((sponsor, index) => (
          <div key={index} className={style.card}>
            <ProtezImage
              src={`academyPage/partners/dark/${sponsor}`}
              alt={sponsor}
              width={356}
              height={212}
              className={style.icon}
            />
          </div>
        ))}
      </TextAppearanceWrapper>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  OurSponsors.displayName = 'OurSponsors'
}

export default OurSponsors
