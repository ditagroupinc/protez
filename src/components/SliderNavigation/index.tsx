import { forwardRef, ReactNode } from 'react'

import styles from './styles.module.scss'
import { icons } from './icons'

type ButtonProps = {
  onClick: () => void
  className?: string
}

export const SliderPrevButton = ({ onClick, className }: ButtonProps) => (
  <button
    className={`${styles.sliderButton} ${styles.prevButton} ${className ?? ''}`}
    onClick={onClick}
    aria-label="Previous slide"
  >
    {icons.arrowLeft(styles.arrowIcon)}
  </button>
)

export const SliderNextButton = ({ onClick, className }: ButtonProps) => (
  <button
    className={`${styles.sliderButton} ${styles.nextButton} ${className ?? ''}`}
    onClick={onClick}
    aria-label="Next slide"
  >
    {icons.arrowRight(styles.arrowIcon)}
  </button>
)

type SliderNavigationProps = {
  children: ReactNode
  className?: string
}

const SliderNavigation = forwardRef<HTMLDivElement, SliderNavigationProps>(function (
  { children, className },
  ref
) {
  return (
    <div ref={ref} className={`${styles.sliderNavigation} ${className ?? ''}`}>
      {children}
    </div>
  )
})

if (process.env.NODE_ENV !== 'production') {
  SliderNavigation.displayName = 'SliderNavigation'
}

export default SliderNavigation
