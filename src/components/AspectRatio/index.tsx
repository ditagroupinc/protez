// import { ReactNode } from 'react'
import Image from 'next/image'

import styles from './style.module.scss'

interface AspectRatioProps {
  src: string
  aspectRatio: number
  // children?: ReactNode
  className?: string
  alt?: string
  opacity?: number
}

export const AspectRatio = ({
  // children,
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
      <Image className={styles.image} src={src} alt={alt} style={{ opacity }} />
      {/* {children} */}
    </div>
  )
}
