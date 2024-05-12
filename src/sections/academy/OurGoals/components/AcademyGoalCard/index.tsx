import { memo } from 'react'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

const AcademyGoalCard = memo(
  ({ image, desc, className }: { image: JSX.Element; desc: string; className?: string }) => {
    return (
      <div className={`${style.academyGoalCard} ${className}`}>
        {image}
        <TextAppearanceWrapper>
          <h5 className={style.cardDesc}>{desc}</h5>
        </TextAppearanceWrapper>
      </div>
    )
  }
)

if (process.env.NODE_ENV !== 'production') {
  AcademyGoalCard.displayName = 'AcademyGoalCard'
}

export default AcademyGoalCard
