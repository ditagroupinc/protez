import Image from 'next/image'

export interface ProtezImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function ProtezImage({ src, alt, width, height, className }: ProtezImageProps) {
  return (
    <Image src={`/protez/${src}`} alt={alt} width={width} height={height} className={className} />
  )
}
