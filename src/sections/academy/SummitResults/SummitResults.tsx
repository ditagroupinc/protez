import Image from 'next/image'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademySection from '@/components/AcademySection'

import styles from './styles.module.scss'
import { icons } from './icons'

const SummitResults = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <AcademySection id="summitResults" className={styles.summitResults}>
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
          <div className={styles.result}>
            <span className={styles.count}>200</span>
            <p className={styles.desc}>Visitors</p>
          </div>
          <div className={styles.result}>
            <span className={styles.count}>22</span>
            <p className={styles.desc}>Invited guests</p>
          </div>
          <div className={styles.result}>
            <span className={styles.count}>12</span>
            <p className={styles.desc}>Prosthetists</p>
          </div>
        </div>
      </div>

      <div className={styles.playerContent}>
        <Image
          src="/summit.jpg"
          alt="summit"
          width={1584}
          height={800}
          layout="responsive"
          className={styles.summitImage}
        />
        <div className={styles.playerButton}>{icons.play(styles.playIcon)}</div>
      </div>
    </AcademySection>
  )
}

export default SummitResults
