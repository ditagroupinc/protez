import Image from 'next/image'
import type { CSSProperties } from 'react'

import { getPath } from './utils'

export interface ProtezImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: CSSProperties
  priority?: boolean
  external?: boolean
  unoptimized?: boolean
  sizes?: string
}

export default function ProtezImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
  external = false,
  unoptimized = false,
  sizes,
}: ProtezImageProps) {
  return (
    <Image
      src={getPath(src, external)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      unoptimized={unoptimized}
      sizes={sizes}
    />
  )
}
