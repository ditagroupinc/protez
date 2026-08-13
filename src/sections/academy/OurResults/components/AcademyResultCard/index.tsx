import { memo } from 'react'
import CountUp from 'react-countup'
import { useLocale } from 'next-intl'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

interface AcademyResultCardProps {
  count: number
  title: string
  className?: string
}

const AcademyResultCard = memo((props: AcademyResultCardProps) => {
  const { count, title, className } = props
  const locale = useLocale()
  const separator = locale === 'uk' ? ' ' : ','

  return (
    <TextAppearanceWrapper className={`${style.academyResultCard} ${className}`}>
      <CountUp end={count} duration={2} separator={separator} className={style.count} />
      <p className={style.desc}>{title}</p>
    </TextAppearanceWrapper>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademyResultCard.displayName = 'AcademyResultCard'
}

export default AcademyResultCard
