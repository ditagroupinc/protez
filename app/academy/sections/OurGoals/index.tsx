import { forwardRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'

import AcademySection from '@/components/AcademySection'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'

const OurGoals = forwardRef<HTMLDivElement>((_, ref) => {
  const { lang } = useLanguage()

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
    <AcademySection ref={ref} id={AcademyIDs.OurGoals} className={style.academyGoalsSection}>
      <div className={style.academyGoalsContent}>
        <div className={style.sectionTitle}>{icons.goalLogo[lang]()}</div>
        {goalCards.map((item, index) => (
          <TextAppearanceWrapper key={index} className={style.cardItem}>
            <div className={style.academyGoalCard}>
              {item.icon(style.cardIcon)}
              <h5 className={style.cardDesc}>{item.text}</h5>
            </div>
          </TextAppearanceWrapper>
        ))}
        <Button
          as="link"
          href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
          target={'_blank'}
          rel="noopener noreferrer"
          variant="normal-blue"
          size="normal"
          className={style.applyBtn}
        >
          <p>{texts.academyHeader.buttons.applyToAcademy[lang]}</p>
          {icons.arrowUp()}
        </Button>
      </div>
    </AcademySection>
  )
})

export default OurGoals
