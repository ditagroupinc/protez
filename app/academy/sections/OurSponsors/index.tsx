import { forwardRef } from 'react'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@academy/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

const OurSponsors = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyTexts()
  const title = useAcademyTitle('ourSponsors')

  return (
    <AcademySection ref={ref} id={AcademyIDs.OurSponsors} className={style.ourSponsors}>
      <TextAppearanceWrapper>
        <ProtezImage {...title.desktop} className={style.title} />
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={style.cardsContainer}>
        {t.ourSponsors.items.map((sponsor, index) => (
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
