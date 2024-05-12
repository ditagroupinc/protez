import { memo } from 'react'
import CountUp from 'react-countup'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

interface AcademyResultCardProps {
  count: number
  title: string
  className?: string
}

const AcademyResultCard = memo((props: AcademyResultCardProps) => {
  const { count, title, className } = props

  return (
    <div className={`${style.academyResultCard} ${className}`}>
      <CountUp end={count} duration={2} className={style.count} />
      <TextAppearanceWrapper>
        <p className={style.desc}>{title}</p>
      </TextAppearanceWrapper>
    </div>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademyResultCard.displayName = 'AcademyResultCard'
}

export default AcademyResultCard
