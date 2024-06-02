import { forwardRef, useMemo } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import Button from '@/components/Button'

import AcademySection from '@/components/AcademySection'
import AcademyGoalCard from './components/AcademyGoalCard'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

const OurGoals = forwardRef<HTMLDivElement>((_, ref) => {
  const { lang } = useLanguage()

  const goalCards = useMemo<Array<{ icon: JSX.Element; text: string }>>(() => {
    return [
      {
        icon: icons.iconDisabledPerson(`${style.cardIcon}`),
        text: texts.academyGoals.goals1[lang],
      },
      {
        icon: icons.iconHand(`${style.cardIcon}`),
        text: texts.academyGoals.goals2[lang],
      },
      {
        icon: icons.iconHelpHeart(`${style.cardIcon}`),
        text: texts.academyGoals.goals3[lang],
      },
    ]
  }, [lang])

  return (
    <AcademySection ref={ref} id="academySection" className={style.academyGoalsSection}>
      <div className={style.academyGoalsContent}>
        <div className={style.sectionTitle}>{icons.goalLogo[lang]()}</div>
        {goalCards.map((item, index) => (
          <TextAppearanceWrapper key={index} className={style.cardItem}>
            <AcademyGoalCard image={item.icon} desc={item.text} />
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
