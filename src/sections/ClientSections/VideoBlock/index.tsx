import { useRef, useState, useEffect } from 'react'

import style from './style.module.scss'
import InNeed from '@/sections/protez/4-InNeed/InNeed'
import OurResults from '@/sections/protez/5-OurResults'
import SmokeWrapper from '../SmokeWrapper'

const VideoBlock = () => {
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
        <video autoPlay loop muted playsInline className={style.video}>
          <source src={'/protez/our-results.mov'} type="video/mp4" />
        </video>
        <div className={style.filter} />
        <div className={style.overlay} />
      </div>
      <SmokeWrapper>
        <InNeed />
      </SmokeWrapper>
      <OurResults ref={sectionRef} />
    </div>
  )
}

export default VideoBlock
