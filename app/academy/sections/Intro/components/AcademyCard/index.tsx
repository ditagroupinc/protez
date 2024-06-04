import { memo } from 'react'
import Image from 'next/image'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

const AcademyCard = memo(
  ({
    image,
    width,
    height,
    className,
  }: {
    image: string
    width: number
    height: number
    className?: string
  }) => {
    return (
      <TextAppearanceWrapper className={`${style.academyCard} ${className}`}>
        <Image
          // TODO: remove after review

          src={`/protez${image}`}
          object-fit="contain"
          alt={image as string}
          width={width}
          height={height}
          className={style.academyLogo}
        />
      </TextAppearanceWrapper>
    )
  }
)

if (process.env.NODE_ENV !== 'production') {
  AcademyCard.displayName = 'AcademyCard'
}

export default AcademyCard
