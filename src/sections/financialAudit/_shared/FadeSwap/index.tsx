import { ReactNode } from 'react'

import style from './style.module.scss'

type Props = {
  swapping: boolean
  children: ReactNode
  className?: string
}

const FadeSwap = ({ swapping, children, className }: Props) => (
  <div className={`${style.fadeSwap} ${swapping ? style.swapping : ''} ${className ?? ''}`}>
    {children}
  </div>
)

export default FadeSwap
