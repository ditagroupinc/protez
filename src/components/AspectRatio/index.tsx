import { ReactNode } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

interface AspectRatioProps {
  src: string
  aspectRatio: number
  children?: ReactNode
  className?: string
  alt?: string
  opacity?: number
}

export const AspectRatio = ({
  children,
  src,
  aspectRatio,
  className,
  alt = 'image',
  opacity = 1,
}: AspectRatioProps) => {
  return (
    <div
      style={{ paddingBottom: `calc(100% / ${aspectRatio})` }}
      className={`${styles.aspectRatio} ${className}`}
    >
      <Image src={src} width="1920" height="880" alt={alt} style={{ opacity }} />
      {children}
    </div>
  )
}
