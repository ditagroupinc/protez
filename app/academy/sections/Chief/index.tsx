import AcademySection from '@academy/components/AcademySection'
import styles from './styles.module.scss'
import { icons } from './icons'
import ProtezImage from '@/components/ProtezImage'
import { forwardRef } from 'react'

import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '../../consts'

const Chief = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('chief')

  return (
    <AcademySection ref={ref} id={AcademyIDs.Chief} className={styles.chief}>
      <div className={styles.chiefContent}>
        <div className={styles.left}>
          <ProtezImage {...titleDesktop} className={styles.sectionTitle} />

          <TextAppearanceWrapper className={styles.profession}>
            {t.chief.role}
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={styles.desc}>
            {t.chief.description}
          </TextAppearanceWrapper>
          <ul className={styles.socialLinkWrapper}>
            <li>
              <a
                href="https://www.instagram.com/yakovgradinar"
                target="blank"
                className={styles.socialLink}
              >
                {icons.iconInstagram()}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yakov-gradinar-6aba10147"
                target="blank"
                className={styles.socialLink}
              >
                {icons.iconLinkedin()}
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/yakovjacob.gradinar"
                target="blank"
                className={styles.socialLink}
              >
                {icons.iconFacebook()}
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <ProtezImage
            src="academyPage/chief/yakov-gradinar.png"
            alt="yakov-gradinar"
            width={672}
            height={880}
            className={styles.image}
          />

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
})

export default Chief
