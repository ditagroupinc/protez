import { forwardRef } from 'react'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@academy/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { icons } from './icons'
import Button from '@academy/components/Button'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

const cardIcons = [
  'support-ukraine.svg',
  'professional-excellence.svg',
  'practical-experience.svg',
  'global-development.svg',
  'innovation.svg',
]

const MissionAndValues = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyTexts()

  return (
    <AcademySection ref={ref} id={AcademyIDs.MissionAndValues} className={style.academyGoals}>
      <div className={style.container}>
        <div className={style.right}>
          <TextAppearanceWrapper>
            {icons.missionAndValuesLogo.desktop(style.title)}
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <p className={style.description}>{t.mission.statement}</p>
          </TextAppearanceWrapper>
          <Button
            as="link"
            href="/donate"
            variant="normal-black"
            size="big"
            className={style.button}
          >
            {t.mission.button}
            {icons.arrowUp(`${style.arrowUpIcon}`)}
          </Button>
        </div>

        <div className={style.left}>
          <ProtezImage
            src="academyPage/mission-and-values.png"
            alt={t.mission.imageAlt}
            width={720}
            height={520}
            className={style.image}
          />
        </div>
      </div>

      <div className={style.cardsContainer}>
        {t.mission.values.map((item, index) => (
          <TextAppearanceWrapper key={index} className={style.card}>
            <ProtezImage
              src={`academyPage/icons/${cardIcons[index]}`}
              alt={cardIcons[index]}
              width={48}
              height={48}
              className={style.icon}
            />
            <div className={style.cardContent}>
              <p className={style.cardTitle}>{item.title}</p>
              {item.text}
            </div>
          </TextAppearanceWrapper>
        ))}
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  MissionAndValues.displayName = 'MissionAndValues'
}

export default MissionAndValues
