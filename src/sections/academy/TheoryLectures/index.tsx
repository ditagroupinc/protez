import Button from '@/components/Button'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './styles.module.scss'
import { icons } from './icons'
import AcademySection from '@/components/AcademySection'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const TheoryLectures = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <AcademySection id="theoryLectures" className={styles.theoryLectures}>
      <div className={styles.grid1x1}>
        <span className={styles.number}>/02</span>
        <p className={styles.desc}>Examples of post-operative care</p>
      </div>
      <div className={styles.gridTitle}>
        {width < 600
          ? icons.theoryLecturesLogo.mobile[lang](styles.sectionTitle)
          : icons.theoryLecturesLogo.desktop[lang](styles.sectionTitle)}
      </div>
      <TextAppearanceWrapper className={styles.grid1x4}>
        <span className={styles.number}>/01</span>
        <p className={styles.desc}>
          Etiology of polytrauma and subsequent management of polytrauma patients
        </p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.grid2x2}>
        <span className={styles.number}>/03</span>
        <p className={styles.desc}>Objectives of pre-amputation consultation</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.grid2x3}>
        <span className={styles.number}>/04</span>
        <p className={styles.desc}>Different levels of upper and lower limb amputations</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.gridButton}>
        <Button as={'link'} variant="normal-blue" href={'/'} className={styles.applyBtn}>
          Apply to
          <br />
          Academy
          {icons.arrowUp()}
        </Button>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.grid3x3}>
        <span className={styles.number}>/05</span>
        <p className={styles.desc}>Overview of cadaver anatomy</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.grid3x4}>
        <span className={styles.number}>/06</span>
        <p className={styles.desc}>Physiology</p>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default TheoryLectures
