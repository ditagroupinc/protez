'use client'

import style from './style.module.scss'
import Image from 'next/image'
import Divider from '@/components/Divider'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

export default function PressReleaseCard({
  image,
  date,
  title,
  text,
}: {
  image: string
  date: string
  title: string
  text: string
}) {
  const { mobile } = useScreenModeAndSize()

  return (
    <div className={style.container}>
      <Image src={image} alt={title} width={482} height={677} className={`${style.picture}`} />

      <TextAppearanceWrapper className={style.textContainer} disableAnimation={mobile}>
        <h6 className={`h6 ${style.date}`}>{date}</h6>
        <Divider className={style.divider} />
        <h1 className={`h1 ${style.title}`}>{title}</h1>
        <h3 className={`h3 ${style.text}`}>{text}</h3>
      </TextAppearanceWrapper>
    </div>
  )
}
