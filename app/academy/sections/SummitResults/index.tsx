import Image from 'next/image'
import { useState, useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import { forwardRef } from 'react'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './styles.module.scss'
import { icons } from './icons'
import { AcademyIDs } from '../../consts'

const SummitResults = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
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
          {width >= 600 && width <= 1024
            ? icons.summitResultsLogo.tablet[lang](styles.title)
            : icons.summitResultsLogo.desktop[lang](styles.title)}

          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam.
            Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc
            suspendisse donec
          </p>
        </div>
        <div className={styles.right}>
          <TextAppearanceWrapper className={styles.card}>
            <span className={styles.count}>200</span>
            <p className={styles.desc}>Visitors</p>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={styles.card}>
            <span className={styles.count}>22</span>
            <p className={styles.desc}>Invited guests</p>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={styles.card}>
            <span className={styles.count}>12</span>
            <p className={styles.desc}>Prosthetists</p>
          </TextAppearanceWrapper>
        </div>
      </div>

      <div className={styles.playerContent}>
        <video
          ref={videoRef}
          controls
          src="/protez/academyPage/summitResults/summitResults.mp4"
          className={styles.summitVideo}
        />
        {!isPlaying && (
          <>
            <Image
              // TODO: remove after review
              src="/protez/academyPage/summitResults/summitResults.png"
              alt="summit"
              width={1584}
              height={800}
              layout="responsive"
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
