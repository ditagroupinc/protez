'use client'

import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

import style from './style.module.scss'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

const Reveal = ({ children, className, delay = 0 }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`${style.reveal} ${inView ? style.inView : ''} ${className ?? ''}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

export default Reveal
