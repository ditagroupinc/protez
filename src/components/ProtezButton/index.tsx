import { ReactNode } from 'react'

import style from './style.module.scss'
import Link, { LinkProps } from 'next/link'

// =================================================================

type ButtonVariant = 'primary-red' | 'primary-white' | 'secondary-white' | 'secondary-black'

type ButtonSize = 'small' | 'normal'

type BaseButtonProps = {
  variant: ButtonVariant
  size?: ButtonSize
}

type ButtonProps = BaseButtonProps &
  (
    | (React.ComponentProps<'button'> & { as: 'button' })
    | (LinkProps & {
        as: 'link'
        className?: string
        children: ReactNode
        target?: '_blank' | '_self' | '_parent' | '_top'
        rel?: string
      })
  )

const variantStyles: Record<ButtonVariant, string> = {
  'primary-white': 'primaryWhite',
  'primary-red': 'primaryRed',
  'secondary-white': 'secondaryWhite',
  'secondary-black': 'secondaryBlack',
}

// =================================================================

const ProtezButton = (props: ButtonProps) => {
  if (props.as === 'button') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant, size = 'normal', className, children, ...rest } = props

    return (
      <button
        className={`${style.button} ${style[variantStyles[variant]]} ${style[size]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  }

  if (props.as === 'link') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant, size = 'big', className, children, ...rest } = props

    return (
      <Link
        prefetch={false}
        className={`${style.button} ${style[variantStyles[variant]]} ${style[size]} ${className}`}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  return null
}

export default ProtezButton
