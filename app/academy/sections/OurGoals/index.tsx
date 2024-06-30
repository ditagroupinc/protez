import { forwardRef } from 'react'

// import { useLanguage } from '@/contexts/LanguageContext'

import Link from 'next/link'

import Section from '@/components/Section'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

// import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { AcademyIDs } from '../../consts'

const OurGoals = forwardRef<HTMLDivElement>((_, ref) => {
  // const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const goalCards = [
    {
      icon: icons.iconDisabledPerson,
      text: 'New skills will allow them to make the prosthetics much faster (days instead of weeks), improve patient satisfaction and significantly reduce the rehabilitation time and number of follow ups.',
    },
    {
      icon: icons.iconHand,
      text: 'Specialists will learn modern approaches in evaluation, casting, fabrication and rehabilitation',
    },
    {
      icon: icons.iconHelpHeart,
      text: 'The instructors are certified trained professionals from Century College, Concordia and University of Minnesota.',
    },
  ]

  return (
    <Section ref={ref} id={AcademyIDs.OurGoals} className={style.academyGoals}>
      <div className={style.academyGoalsContent}>
        <div className={style.linkCell}>
          <Link href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6" target="blank" className={style.link}>
            <p>Apply to Academy</p>
            {icons.arrowUp(style.icon)}
          </Link>
        </div>
        <div className={style.titleCell}>
          {width < 900 ? icons.goalLogo.mobile(style.title) : icons.goalLogo.desktop(style.title)}
        </div>
        {goalCards.map((item, index) => (
          <TextAppearanceWrapper key={index} className={style.card}>
            {item.icon(style.icon)}
            <h5 className={style.cardDesc}>{item.text}</h5>
          </TextAppearanceWrapper>
        ))}
      </div>
    </Section>
  )
})

export default OurGoals
