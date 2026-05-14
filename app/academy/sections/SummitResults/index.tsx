import ProtezImage from '@/components/ProtezImage'
import { useState, useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import AcademySection from '@academy/components/AcademySection'

import { forwardRef } from 'react'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './styles.module.scss'
import { icons } from './icons'
import { AcademyIDs } from '../../consts'

const SummitResults = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const t = useAcademyTexts()
  const { width } = useScreenModeAndSize()
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
            {width >= 600 && width <= 1024
              ? icons.summitResultsLogo.tablet[lang](styles.title)
              : icons.summitResultsLogo.desktop[lang](styles.title)}
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={styles.desc}>
            {t.summitResults.description}
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
