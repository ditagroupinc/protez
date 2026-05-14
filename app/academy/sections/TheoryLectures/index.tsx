import Button from '@academy/components/Button'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './styles.module.scss'
import { icons } from './icons'
import AcademySection from '@academy/components/AcademySection'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import { AcademyIDs } from '../../consts'

const TheoryLectures = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const t = useAcademyTexts()
  const items = t.theoryLectures.items

  return (
    <AcademySection id={AcademyIDs.TheoryLectures} className={styles.theoryLectures}>
      <TextAppearanceWrapper className={`${styles.grid1x1} ${styles.card}`}>
        <span className={styles.number}>/02</span>
        <p className={styles.desc}>{items[1]}</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={styles.gridTitle}>
        {width < 600
          ? icons.theoryLecturesLogo.mobile[lang](styles.sectionTitle)
          : icons.theoryLecturesLogo.desktop[lang](styles.sectionTitle)}
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${styles.grid1x4} ${styles.card}`}>
        <span className={styles.number}>/01</span>
        <p className={styles.desc}>{items[0]}</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${styles.grid2x2} ${styles.card}`}>
        <span className={styles.number}>/03</span>
        <p className={styles.desc}>{items[2]}</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${styles.grid2x3} ${styles.card}`}>
        <span className={styles.number}>/04</span>
        <p className={styles.desc}>{items[3]}</p>
      </TextAppearanceWrapper>
      <div className={styles.gridButton}>
        <Button as={'link'} variant="normal-blue" href={'/'} className={styles.applyBtn}>
          {t.theoryLectures.cta}
          {icons.arrowUp()}
        </Button>
      </div>
      <TextAppearanceWrapper className={`${styles.grid3x3} ${styles.card}`}>
        <span className={styles.number}>/05</span>
        <p className={styles.desc}>{items[4]}</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${styles.grid3x4} ${styles.card}`}>
        <span className={styles.number}>/06</span>
        <p className={styles.desc}>{items[5]}</p>
      </TextAppearanceWrapper>
    </AcademySection>
  )
}

export default TheoryLectures
