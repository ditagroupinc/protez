import { forwardRef } from 'react'

import style from './style.module.scss'

const Section = forwardRef<HTMLDivElement, React.ComponentProps<'section'>>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <section ref={ref} className={`${style.section} ${className}`} {...rest}>
      {children}
    </section>
  )
})

export default Section
