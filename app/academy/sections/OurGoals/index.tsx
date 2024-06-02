import { forwardRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import Link from 'next/link'

import AcademySection from '@/components/AcademySection'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { AcademyIDs } from '../../consts'

const OurGoals = forwardRef<HTMLDivElement>((_, ref) => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const goalCards = [
    {
      icon: icons.iconDisabledPerson,
      text: texts.academyGoals.goals1[lang],
    },
    {
      icon: icons.iconHand,
      text: texts.academyGoals.goals2[lang],
    },
    {
      icon: icons.iconHelpHeart,
      text: texts.academyGoals.goals3[lang],
    },
  ]

  return (
    <AcademySection ref={ref} id={AcademyIDs.OurGoals} className={style.academyGoals}>
      <div className={style.academyGoalsContent}>
        <div className={style.linkCell}>
          <Link href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6" target="blank" className={style.link}>
            <p>{texts.academyHeader.buttons.applyToAcademy[lang]}</p>
            {icons.arrowUp(style.icon)}
          </Link>
        </div>
        <div className={style.titleCell}>
          {width < 900
            ? icons.goalLogo.mobile[lang](style.title)
            : icons.goalLogo.desktop[lang](style.title)}
        </div>
        {goalCards.map((item, index) => (
          <TextAppearanceWrapper key={index} className={style.card}>
            {item.icon(style.icon)}
            <h5 className={style.cardDesc}>{item.text}</h5>
          </TextAppearanceWrapper>
        ))}
      </div>
    </AcademySection>
  )
})

export default OurGoals
