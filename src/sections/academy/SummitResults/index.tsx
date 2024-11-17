import { useState, useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Section from '@/components/Section'

import { forwardRef } from 'react'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'
import { icons } from './icons'
import { AcademyIDs } from '@/consts'
import ProtezImage from '@/components/ProtezImage'
import ProtezVideo from '@/components/ProtezVideo'

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
    <Section ref={ref} id={AcademyIDs.SummitResults} className={style.summitResults}>
      <div className={style.resultInfo}>
        <div className={style.left}>
          {width >= 600 && width <= 1024
            ? icons.summitResultsLogo.tablet[lang](style.title)
            : icons.summitResultsLogo.desktop[lang](style.title)}

          <p className={style.desc}>
            Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam.
            Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc
            suspendisse donec
          </p>
        </div>
        <div className={style.right}>
          <TextAppearanceWrapper className={style.card}>
            <span className={style.count}>200</span>
            <p className={style.desc}>Visitors</p>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={style.card}>
            <span className={style.count}>22</span>
            <p className={style.desc}>Invited guests</p>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={style.card}>
            <span className={style.count}>12</span>
            <p className={style.desc}>Prosthetists</p>
          </TextAppearanceWrapper>
        </div>
      </div>

      <div className={style.playerContent}>
        <ProtezVideo
          ref={videoRef}
          controls
          src="academyPage/summitResults/summitResults.mp4"
          className={style.summitVideo}
        />
        {!isPlaying && (
          <>
            <ProtezImage
              src="academyPage/summitResults/summitResults.png"
              alt="summit"
              width={1584}
              height={800}
              layout="responsive"
              className={style.videoOverlay}
            />

            <button className={style.playerButton} onClick={handlePlayButtonClick}>
              {icons.play(style.playIcon)}
            </button>
          </>
        )}
      </div>
    </Section>
  )
})

export default SummitResults
