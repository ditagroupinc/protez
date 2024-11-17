import Image from 'next/image'

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
  return (
    <Image
      src={`/protez/${src}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      layout={layout}
      priority={priority}
    />
  )
}
