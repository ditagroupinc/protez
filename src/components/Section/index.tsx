import { forwardRef, useEffect } from 'react'

import style from './style.module.scss'

const Section = forwardRef<HTMLDivElement, React.ComponentProps<'section'>>((props, ref) => {
  const { className, children, ...rest } = props

  useEffect(() => {
    console.log('Ref in Section:', ref)
  }, [ref])

  return (
    <section ref={ref} className={`${style.section} ${className}`} {...rest}>
      {children}
    </section>
  )
})

export default Section
