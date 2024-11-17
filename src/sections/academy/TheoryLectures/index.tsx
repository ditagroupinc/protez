import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'
import { icons } from './icons'
import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { AcademyIDs } from '@/consts'
import { SeeAllButton } from '@/components/Button'

const TheoryLectures = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <Section id={AcademyIDs.TheoryLectures} className={style.theoryLectures}>
      <TextAppearanceWrapper className={`${style.grid1x1} ${style.card}`}>
        <span className={style.number}>/02</span>
        <p className={style.desc}>Examples of post-operative care</p>
      </TextAppearanceWrapper>
      <div className={style.gridTitle}>
        {width < 600
          ? icons.theoryLecturesLogo.mobile[lang](style.sectionTitle)
          : icons.theoryLecturesLogo.desktop[lang](style.sectionTitle)}
      </div>
      <TextAppearanceWrapper className={`${style.grid1x4} ${style.card}`}>
        <span className={style.number}>/01</span>
        <p className={style.desc}>
          Etiology of polytrauma and subsequent management of polytrauma patients
        </p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${style.grid2x2} ${style.card}`}>
        <span className={style.number}>/03</span>
        <p className={style.desc}>Objectives of pre-amputation consultation</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${style.grid2x3} ${style.card}`}>
        <span className={style.number}>/04</span>
        <p className={style.desc}>Different levels of upper and lower limb amputations</p>
      </TextAppearanceWrapper>
      <div className={style.gridButton}>
        <SeeAllButton href="/" className={style.applyBtn} color="blue">
          <span>Apply to Academy</span>
        </SeeAllButton>
      </div>
      <TextAppearanceWrapper className={`${style.grid3x3} ${style.card}`}>
        <span className={style.number}>/05</span>
        <p className={style.desc}>Overview of cadaver anatomy</p>
      </TextAppearanceWrapper>
      <TextAppearanceWrapper className={`${style.grid3x4} ${style.card}`}>
        <span className={style.number}>/06</span>
        <p className={style.desc}>Physiology</p>
      </TextAppearanceWrapper>
    </Section>
  )
}

export default TheoryLectures
