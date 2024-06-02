import { memo } from 'react'

import style from './style.module.scss'

const AcademyGoalCard = memo(
  ({ image, desc, className }: { image: JSX.Element; desc: string; className?: string }) => {
    return (
      <div className={`${style.academyGoalCard} ${className}`}>
        {image}

        <h5 className={style.cardDesc}>{desc}</h5>
      </div>
    )
  }
)

if (process.env.NODE_ENV !== 'production') {
  AcademyGoalCard.displayName = 'AcademyGoalCard'
}

export default AcademyGoalCard
