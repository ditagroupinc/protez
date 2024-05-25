import AcademySection from '../AcademySection'
import styles from './styles.module.scss'
import { icons } from './icons'
import Image from 'next/image'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const Chief = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <AcademySection id="chief" className={styles.chief}>
      <div className={styles.chiefContent}>
        <div className={styles.left}>
          {width < 600
            ? icons.chiefLogo.mobile[lang](styles.sectionTitle)
            : icons.chiefLogo.desktop[lang](styles.sectionTitle)}

          <p className={styles.profession}>
            CHIEF MEDICAL OFFICER, <br /> CERTIFIED PROSTHETIST AND ORTHOTIST
          </p>
          <p className={styles.desc}>
            During the course of the program they will learn proven methods developed by the US
            healthcare practitioners over many years of treating veterans and also Dr. Yakov
            Gradinar’s personal technical know-how’s employed in his 15 years of practice. More
            importantly, the program is a way for overworked and underpaid Ukrainian doctors to come
            to the US where they will take a break from hearing sirens and rockets while learning
            practical skills to help many more Ukrainians in the future.
          </p>
          <ul className={styles.socialLinkWrapper}>
            <li>
              <a href="/" className={styles.socialLink}>
                {icons.iconTwitter()}
              </a>
            </li>
            <li>
              <a href="/" className={styles.socialLink}>
                {icons.iconLinkedin()}
              </a>
            </li>
            <li>
              <a href="/" className={styles.socialLink}>
                {icons.iconFacebook()}
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <Image src="/yakov-gradinar.png" alt="yakov-gradinar" width={672} height={880} />

          <div className={styles.playBtnWrapper}>
            <button className={styles.playBtn}>
              {icons.playText(styles.spin)}
              {icons.play(styles.playIcon)}
            </button>
          </div>
        </div>
      </div>
    </AcademySection>
  )
}

export default Chief
