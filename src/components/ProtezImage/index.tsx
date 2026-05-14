import Image from 'next/image'
import { getPath } from './utils'

const environment = process.env.ENVIRONMENT

export interface ProtezImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  layout?: string
  priority?: boolean
  external?: boolean
}

export default function ProtezImage({
  src,
  alt,
  width,
  height,
  className,
  layout,
  priority = false,
  external = false,
}: ProtezImageProps) {
  const path = getPath(src, external, environment || '')

  return (
    <Image
      src={path}
      alt={alt}
      width={width}
      height={height}
      className={className}
      layout={layout}
      priority={priority}
    />
  )
}
