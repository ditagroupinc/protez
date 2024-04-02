import style from './pressReleaseCard.module.scss'
import Image from 'next/image'
import Divider from '../Divider'

export default function PressReleaseCard({ image, date, title, text }) {
  return (
    <div className={style.container}>
      <Image src={image} alt={title} width={482} height={677} className={`${style.picture}`} />

      <div className={`textContainer ${style.textContainer}`}>
        <h6 className={`h6 ${style.date}`}>{date}</h6>
        <Divider className={style.divider} />
        <h1 className={`h1 ${style.title}`}>{title}</h1>
        <h3 className={`h3 ${style.text}`}>{text}</h3>
      </div>
    </div>
  )
}
