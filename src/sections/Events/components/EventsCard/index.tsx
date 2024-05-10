'use client'
import Image from 'next/image'
import style from './style.module.scss'
import icons from './icons'
import texts from '@/texts&svg'

import { useLanguage } from '@/contexts/LanguageContext'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

export default function EventsCard({
  link,
  photo,
  date,
  address,
  title,
  status,
}: {
  link: string
  photo: string
  date: string
  address: string
  title: string
  status: 'past' | 'upcoming'
}) {
  const { lang } = useLanguage()

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
          <TextAppearanceWrapper className={style.eventsCardHeader}>
            <span className={`h6 ${style.eventsCardStatus}`}>{statusText}</span>
            <h4 className={`h4`}>{date}</h4>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <h4 className={`h4 ${style.title}`}>{title}</h4>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>{icons.arrow(`${style.arrowIcon} arrow`)}</TextAppearanceWrapper>
        </div>

        <TextAppearanceWrapper className={`${style.location} h5`}>
          <div className={`${style.locationText}`}>
            {icons.location(`${style.locationIcon}`)}
            <span>{address}</span>
          </div>
        </TextAppearanceWrapper>

        <span className={`h6 ${style.more}`}>{texts.upcomingEvents.more[lang]}</span>
      </a>
    </div>
  )
}
