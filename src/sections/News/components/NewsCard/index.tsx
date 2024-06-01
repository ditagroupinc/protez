'use client'

import Image from 'next/image'
import style from './style.module.css'
import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

interface NewsCardProps {
  link: string
  photo: string
  date: string
  address: string
  logo: string
  title: string
  text: string
  short?: boolean
}

export default function NewsCard({
  link,
  photo,
  date,
  address,
  logo,
  title,
  text,
  short,
}: NewsCardProps) {
  const shortClass = () => (short ? style.short : '')

  return (
    <a href={link} target="blank" className={`${style.newsCard} ${shortClass()}`}>
      <Image
        src={photo}
        alt="article picture"
        width={390}
        height={544}
        className={`${style.newsPicture} ${shortClass()}`}
      />
      <TextAppearanceWrapper className={`${style.date} h6`}>
        <span>{date}</span>|<span>{address}</span>
      </TextAppearanceWrapper>

      <TextAppearanceWrapper>
        <img src={logo} alt="article picture" className={style.logo} />
      </TextAppearanceWrapper>

      <TextAppearanceWrapper>
        <h3 className={`h3 ${style.title}`}>{title}</h3>

        <p className={`p ${style.text}`}>{text}</p>
      </TextAppearanceWrapper>
      {icons.arrow(`${style.icon} arrow`)}
    </a>
  )
}
