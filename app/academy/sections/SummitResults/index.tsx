import ProtezImage from '@/components/ProtezImage'
import { useState, useRef } from 'react'

import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import AcademySection from '@academy/components/AcademySection'

import { forwardRef } from 'react'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './styles.module.scss'
import { icons } from './icons'
import { AcademyIDs } from '../../consts'

const SummitResults = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('summit-results')
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <AcademySection ref={ref} id={AcademyIDs.SummitResults} className={styles.summitResults}>
      <div className={styles.resultInfo}>
        <div className={styles.left}>
          <TextAppearanceWrapper>
            <ProtezImage {...titleDesktop} className={styles.title} />
          </TextAppearanceWrapper>
        </div>
        <div className={styles.right}>
          {t.summitResults.stats.map((stat, index) => (
            <TextAppearanceWrapper key={index} className={styles.card}>
              <span className={styles.count}>{stat.count}</span>
              <p className={styles.desc}>{stat.label}</p>
            </TextAppearanceWrapper>
          ))}
        </div>
      </div>

      <div className={styles.playerContent}>
        <video
          ref={videoRef}
          controls
          src="academyPage/summitResults/summitResults.mp4"
          className={styles.summitVideo}
        />
        {!isPlaying && (
          <>
            <ProtezImage
              src="academyPage/summitResults/summitResults.png"
              alt={t.summitResults.imageAlt}
              width={1584}
              height={800}
              className={styles.videoOverlay}
            />

            <button className={styles.playerButton} onClick={handlePlayButtonClick}>
              {icons.play(styles.playIcon)}
            </button>
          </>
        )}
      </div>
    </AcademySection>
  )
})

export default SummitResults
