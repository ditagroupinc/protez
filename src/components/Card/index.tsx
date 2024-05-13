import React, { ReactNode } from 'react'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import style from './style.module.css'

const Card = ({
  text,
  icon,
  reverse,
}: {
  text: string
  icon: () => ReactNode
  reverse?: boolean
}) => {
  return (
    <div className={`h5 ${style.block} ${reverse && style.reverseBlock}`}>
      <TextAppearanceWrapper>
        <h5>{text}</h5>
      </TextAppearanceWrapper>
      {icon()}
    </div>
  )
}

export default Card
