import { FunctionComponent } from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'

interface TextAppearanceWrapperProps extends HTMLMotionProps<'div'> {
  reverse?: boolean
}

export const TextAppearanceWrapper = ({
  children,
  reverse = false,
  ...props
}: TextAppearanceWrapperProps) => {
  const variants: Variants = {
    offscreen: { y: reverse ? -100 : 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}
