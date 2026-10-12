import { ReactNode } from 'react'

import style from './style.module.scss'

interface GlassBackgroundProps {
  fadeTop?: boolean
  fadeBottom?: boolean
  children?: ReactNode
}

const GlassBackground = ({
  fadeTop = false,
  fadeBottom = false,
  children,
}: GlassBackgroundProps) => (
  <div
    aria-hidden="true"
    className={`${style.background} ${fadeTop ? style.fadeTop : ''} ${fadeBottom ? style.fadeBottom : ''}`}
  >
    {children}
  </div>
)

export default GlassBackground
