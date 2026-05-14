import { useRef, useState, useEffect, ReactElement, cloneElement } from 'react'

import style from './style.module.scss'
import SmokeWrapper from '../SmokeWrapper'
import ProtezVideo from '@/components/ProtezVideo'

interface VideoBlockProps {
  inNeedSection: ReactElement
  ourResultsSection: ReactElement
}

const VideoBlock = ({ inNeedSection, ourResultsSection }: VideoBlockProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    const updateHeight = () => {
      if (sectionRef.current) {
        setHeight(sectionRef.current.getBoundingClientRect().height)
      }
    }

    // Initialize height
    updateHeight()

    // Create a ResizeObserver to update the height dynamically
    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current)
    }

    // Cleanup the observer on unmount
    return () => {
      if (sectionRef.current) {
        resizeObserver.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className={style.videoBlock}>
      <div className={style.videoContainer} style={{ height: height }}>
        <ProtezVideo
          autoPlay
          loop
          muted
          playsInline
          className={style.video}
          src={'our-results.mov'}
        />
        <div className={style.filter} />
        <div className={style.overlay} />
      </div>
      <SmokeWrapper>{inNeedSection}</SmokeWrapper>
      {cloneElement(ourResultsSection, { ref: sectionRef })}
    </div>
  )
}

export default VideoBlock
