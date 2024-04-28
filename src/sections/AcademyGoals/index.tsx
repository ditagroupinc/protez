import { forwardRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'

import AcademySection from '@/sections/AcademySection'
import AcademyGoalCard from '@/sections/AcademyGoals/components/AcademyGoalCard'

import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

const AcademyGoals = forwardRef<HTMLDivElement>((_, ref) => {
  const { lang } = useLanguage()

  return (
    <AcademySection ref={ref} id="academySection" className={style.academyGoalsSection}>
      <div className={style.academyGoalsContent}>
        <div className={style.sectionTitle}>{icons.goalLogo[lang]()}</div>
        <AcademyGoalCard
          image={icons.iconDisabledPerson(`${style.cardIcon}`)}
          desc={texts.academyGoals.goals1[lang]}
          className={style.cardItem}
        />
        <AcademyGoalCard
          image={icons.iconHand(`${style.cardIcon}`)}
          desc={texts.academyGoals.goals2[lang]}
          className={style.cardItem}
        />
        <AcademyGoalCard
          image={icons.iconHelpHeart(`${style.cardIcon}`)}
          desc={texts.academyGoals.goals3[lang]}
          className={style.cardItem}
        />
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

if (process.env.NODE_ENV !== 'production') {
  AcademyGoals.displayName = 'AcademyGoals'
}

export default AcademyGoals
