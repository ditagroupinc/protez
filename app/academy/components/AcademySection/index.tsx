import { forwardRef } from 'react'

import style from './style.module.scss'

const AcademySection = forwardRef<HTMLDivElement, React.ComponentProps<'section'>>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <section ref={ref} className={`${style.section} ${className}`} {...rest}>
      {children}
    </section>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademySection.displayName = 'AcademySection'
}

export default AcademySection
