import { forwardRef } from 'react'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@academy/components/AcademySection'

import style from './style.module.scss'

import { AcademyAboutIDs } from '../../consts'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyAboutTexts } from '@/hooks/useAcademyAboutTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

interface Props {
  id: AcademyAboutIDs
}

const History = forwardRef<HTMLDivElement, Props>(function ({ id }, ref) {
  const t = useAcademyAboutTexts()
  const { desktop: titleDesktop } = useAcademyTitle('about-academy')

  return (
    <AcademySection ref={ref} id={id} className={style.academyGoals}>
      <ProtezImage {...titleDesktop} className={style.mainTitle} />
      <div className={style.container}>
        <div className={style.right}>
          <TextAppearanceWrapper>
            <h2 className={style.title}>{t.history.title}</h2>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <div className={style.description}>
              {t.history.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </TextAppearanceWrapper>
        </div>
        <div className={style.left}>
          <ProtezImage
            src="academyPage/about-history.png"
            alt={t.history.imageAlt}
            width={762}
            height={620}
            className={style.image}
          />
        </div>
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  History.displayName = 'History'
}

export default History
