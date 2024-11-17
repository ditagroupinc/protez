import { forwardRef } from 'react'

export interface ProtezVideoProps {
  src: string
  className?: string

  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  controls?: boolean
}

export const ProtezVideo = forwardRef<HTMLVideoElement, ProtezVideoProps & { sourceType?: string }>(
  function ProtezVideoWithSource(
    { src, className, autoPlay, loop, muted, playsInline, controls, sourceType = 'video/mp4' },
    ref
  ) {
    return (
      <video
        ref={ref}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        className={className}
      >
        <source src={`/protez/${src}`} type={sourceType} />
      </video>
    )
  }
)

export default ProtezVideo

ProtezVideo.displayName = 'ProtezVideo'
