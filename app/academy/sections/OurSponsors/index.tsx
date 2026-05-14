import { forwardRef } from 'react'

import Image from 'next/image'

import AcademySection from '@academy/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { icons } from './icons'

const sponsors = ['direct-relief_dark.svg', 'rotary_dark.svg']

const OurSponsors = forwardRef<HTMLDivElement>(function (_, ref) {
  return (
    <AcademySection ref={ref} id={AcademyIDs.OurSponsors} className={style.ourSponsors}>
      {icons.ourSponsorsLogo.desktop(style.title)}

      <div className={style.cardsContainer}>
        {sponsors.map((sponsor, index) => (
          <div key={index} className={style.card}>
            <Image
              src={`/protez/academyPage/partners/dark/${sponsor}`}
              alt={sponsor}
              width={356}
              height={212}
              className={style.icon}
            />
          </div>
        ))}
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  OurSponsors.displayName = 'OurSponsors'
}

export default OurSponsors
