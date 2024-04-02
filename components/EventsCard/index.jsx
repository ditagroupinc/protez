'use client'
import Image from 'next/image'
import style from './eventsCard.module.scss'
import icons from './icons'
import texts from '@/texts&svg'

import { useContext } from 'react'
import { LanguageContext } from '@/contexts/LanguageContext'

export default function EventsCard({ link, photo, date, address, title, status }) {
  const { lang } = useContext(LanguageContext)

  const pastClass = status === 'past' ? style.past : ''

  const statusText = `${texts.upcomingEvents[status][lang]} ${texts.upcomingEvents.event[lang]}`

  return (
    <div className={style.eventsCardWrapper}>
      <a href={link} target="blank" className={`${style.eventsCard} ${pastClass}`}>
        <Image
          src={photo}
          alt="article picture"
          width={400}
          height={432}
          className={`${style.eventsCardPicture}`}
        />
        <div className={style.eventsCardFlexContainer}>
          <div className={`textContainer ${style.eventsCardHeader}`}>
            <span className={`h6 ${style.eventsCardStatus}`}>{statusText}</span>
            <h4 className={`h4`}>{date}</h4>
          </div>
          <div className="textContainer">
            <h4 className={`h4 textContainer ${style.title}`}>{title}</h4>
          </div>
          {icons.arrow(`${style.arrowIcon} textContainer arrow`)}
        </div>

        <h5 className={`${style.location} h5 textContainer`}>
          <div className={`${style.locationText}`}>
            {icons.location(`${style.locationIcon}`)}
            <span>{address}</span>
          </div>
        </h5>

        <span className={`h6 ${style.more}`}>{texts.upcomingEvents.more[lang]}</span>
      </a>
    </div>
  )
}
