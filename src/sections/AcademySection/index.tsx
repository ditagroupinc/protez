import { memo } from 'react'

import style from './style.module.scss'

const AcademySection = memo((props: React.ComponentProps<'section'>) => {
  const { className, children, ...rest } = props

  return (
    <section className={`${style.section} ${className}`} {...rest}>
      {children}
    </section>
  )
})

export default AcademySection

if (process.env.NODE_ENV !== 'production') {
  AcademySection.displayName = 'AcademySection'
}
