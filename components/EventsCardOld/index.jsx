import Image from 'next/image'
import style from './eventsCard.module.scss'
import icons from './icons'

export default function EventsCardOld({ link, photo, date, time, address, title, opened }) {
  const openedClass = opened ? style.opened : ''

  return (
    <a href={link} target="blank" className={`${style.eventsCard} ${openedClass}`}>
      {opened ? (
        <Image
          src={photo}
          alt="article picture"
          width={390}
          height={544}
          className={`${style.newsPicture} ${openedClass}`}
        />
      ) : (
        ''
      )}

      <h6 className={`${style.dateTimeLocation} h6 textContainer`}>
        <span>{date}</span>
        {opened ? (
          <>
            <span>|</span>
            <span>{time}</span>
          </>
        ) : (
          ''
        )}
        <div className={`${style.locationText}`}>
          {icons.location(`${style.iconLocation}`)}
          <span>{address}</span>
        </div>
      </h6>
      <div className="textContainer">
        <h4 className={` ${style.title}`}>{title}</h4>
      </div>

      {opened ? <>{icons.arrow(`${style.arrowIcon} arrow ${openedClass}`)}</> : ''}
    </a>
  )
}
