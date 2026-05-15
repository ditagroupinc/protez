import Button from '@academy/components/Button'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import styles from './styles.module.scss'
import { icons } from './icons'
import AcademySection from '@academy/components/AcademySection'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import { AcademyIDs } from '../../consts'

const gridClassByNumber: Record<string, string> = {
  '/01': 'grid1x4',
  '/02': 'grid1x1',
  '/03': 'grid2x2',
  '/04': 'grid2x3',
  '/05': 'grid3x3',
  '/06': 'grid3x4',
}

const TheoryLectures = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const t = useAcademyTexts()
  const byNumber = (n: string) => t.theoryLectures.items.find(i => i.number === n)

  const lecture = (n: string) => {
    const item = byNumber(n)
    const cls = styles[gridClassByNumber[n]]

    return (
      <TextAppearanceWrapper className={`${cls} ${styles.card}`}>
        <span className={styles.number}>{item?.number}</span>
        <p className={styles.desc}>{item?.desc}</p>
      </TextAppearanceWrapper>
    )
  }

  return (
    <AcademySection id={AcademyIDs.TheoryLectures} className={styles.theoryLectures}>
      {lecture('/02')}
      <TextAppearanceWrapper className={styles.gridTitle}>
        {width < 600
          ? icons.theoryLecturesLogo.mobile[lang](styles.sectionTitle)
          : icons.theoryLecturesLogo.desktop[lang](styles.sectionTitle)}
      </TextAppearanceWrapper>
      {lecture('/01')}
      {lecture('/03')}
      {lecture('/04')}
      <div className={styles.gridButton}>
        <Button as={'link'} variant="normal-blue" href={'/'} className={styles.applyBtn}>
          {t.cta.apply}
          {icons.arrowUp()}
        </Button>
      </div>
      {lecture('/05')}
      {lecture('/06')}
    </AcademySection>
  )
}

export default TheoryLectures
