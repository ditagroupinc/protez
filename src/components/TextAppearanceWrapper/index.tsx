'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import style from './style.module.scss'

interface TextAppearanceWrapperProps extends HTMLAttributes<HTMLDivElement> {
  reverse?: boolean
  isDisabled?: boolean
  children?: ReactNode
}

export const TextAppearanceWrapper = ({
  children,
  reverse = false,
  isDisabled = false,
  className,
  ...rest
}: TextAppearanceWrapperProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.8 })
  const visible = isDisabled || inView
  const classes = [style.wrapper, reverse && style.reverse, visible && style.visible, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  )
}
