import React, { ReactNode, FunctionComponent } from 'react'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import style from './style.module.css'

interface CardProps {
  text: string
  icon: () => ReactNode
  reverse?: boolean
}

const Card: FunctionComponent<CardProps> = ({ text, icon, reverse }) => {
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
