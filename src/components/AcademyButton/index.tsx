import { ComponentProps, ReactNode } from 'react'

import style from './style.module.scss'
// Locale-aware Link: internal hrefs get the /ua prefix, external URLs and
// #anchors pass through untouched.
import { Link } from '@/lib/i18n'

type LinkProps = ComponentProps<typeof Link>

// =================================================================

type ButtonVariant =
  | 'primary-blue'
  | 'primary-white'
  | 'secondary-white'
  | 'secondary-black'
  | 'secondary-fill-black'
  | 'normal-blue'
  | 'normal-black'

type ButtonSize = 'big' | 'small' | 'normal'

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
  'primary-blue': 'primaryBlue',
  'secondary-black': 'secondaryBlack',
  'secondary-white': 'secondaryWhite',
  'secondary-fill-black': 'secondaryFillBlack',
  'normal-black': 'normalBlack',
  'normal-blue': 'normalBlue',
}

// =================================================================

const Button = (props: ButtonProps) => {
  if (props.as === 'button') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant, size = 'big', className, children, ...rest } = props

    return (
      <button
        className={`${style.btn} ${style[variantStyles[variant]]} ${style[size]} ${className}`}
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
        className={`${style.btn} ${style[variantStyles[variant]]} ${style[size]} ${className}`}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  return null
}

export default Button
