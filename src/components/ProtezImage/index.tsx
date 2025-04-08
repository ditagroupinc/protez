import Image from 'next/image'

const environment = process.env.ENVIRONMENT

export interface ProtezImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  layout?: string
  priority?: boolean
}

export default function ProtezImage({
  src,
  alt,
  width,
  height,
  className,
  layout,
  priority = false,
}: ProtezImageProps) {
  const path = environment === 'pages' ? `/protez/${src}` : `/${src}`

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
