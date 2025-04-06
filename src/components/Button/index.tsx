import { ReactElement, ReactNode } from 'react'

import style from './style.module.scss'
import Link, { LinkProps } from 'next/link'

import { icons } from './icons'
import { Languages } from '@/types'

// =================================================================

type ButtonVariant =
  | 'primary-red'
  | 'primary-white'
  | 'secondary-white'
  | 'secondary-black'
  | 'primary-blue'
  | 'primary-black'
  | 'secondary-blue'

type ButtonSize = 'small' | 'normal'

type BaseButtonProps = {
  variant: ButtonVariant
  size: ButtonSize
  arrow?: boolean
  squared?: boolean
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
  'secondary-white': 'secondaryWhite',

  'primary-red': 'primaryRed',

  'primary-black': 'primaryBlack',
  'secondary-black': 'secondaryBlack',

  'primary-blue': 'primaryBlue',

  'secondary-blue': 'secondaryBlue',
}

// =================================================================

const Button = (props: ButtonProps) => {
  if (props.as === 'button') {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      as,
      variant,
      size,
      squared,
      className,
      children,
      arrow,
      ...rest
    } = props

    return (
      <button
        className={`${style.button} ${arrow ? style.hasArrow : ''} ${style[variantStyles[variant]]} ${style[size]} ${squared ? style.squared : ''} ${className}`}
        {...rest}
      >
        {children}
        {arrow && icons.arrow(style.icon)}
      </button>
    )
  }

  if (props.as === 'link') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant, size = 'big', squared, className, children, arrow, ...rest } = props

    return (
      <Link
        prefetch={false}
        className={`${style.button} ${arrow ? style.hasArrow : ''} ${style[variantStyles[variant]]} ${style[size]} ${squared ? style.squared : ''} ${className}`}
        {...rest}
      >
        {children}
        {arrow && icons.arrow(style.icon)}
      </Link>
    )
  }

  return null
}

export default Button

const text = {
  makeDonation: {
    english: 'Make Donation',
    ukrainian: 'Зробити внесок!',
  },

  supportWith: {
    english: 'Support with',
    ukrainian: 'Підтримати з',
  },
  applyToAcademy: {
    english: 'Apply to Academy',
    ukrainian: 'Apply to Academy',
  },
}

export const MakeDonationButton = ({
  lang,
  className,
  size,
}: {
  lang: Languages
  className?: string
  size: ButtonSize
}) => (
  <Button
    as="link"
    // href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
    href="/donate"
    target={'_blank'}
    variant="primary-red"
    size={size}
    rel="noopener noreferrer"
    className={`${className ? className : ''}`}
  >
    {text.makeDonation[lang]}
  </Button>
)

export const SupportWithAmazonButton = ({
  lang,
  className,
  color = 'black',
  size,
}: {
  lang: Languages
  className?: string
  color?: 'white' | 'black'
  size: ButtonSize
}) => (
  <Button
    as="link"
    href="/"
    size={size}
    variant={color === 'white' ? 'secondary-white' : 'secondary-black'}
    className={`${className ? className : ''}`}
  >
    {text.supportWith[lang]}

    {icons.amazon(style.icon)}
  </Button>
)

export const SeeAllButton = ({
  children,
  className,
  href,
  color = 'black',
}: {
  children: ReactElement
  className?: string
  href: string
  color?: 'black' | 'blue'
}) => (
  <Button
    squared
    as="link"
    href={href}
    variant={color === 'black' ? 'primary-black' : 'secondary-blue'}
    arrow
    className={`${style.discoverAllButton} ${className ? className : ''}`}
    target="_blank"
    size="normal"
  >
    {children}
  </Button>
)

export const ApplyToAcademyButton = ({
  lang,
  className,
  size,
}: {
  lang: Languages
  className?: string
  size: ButtonSize
}) => (
  <Button
    as="link"
    href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
    target={'_blank'}
    variant="primary-blue"
    size={size}
    rel="noopener noreferrer"
    className={`${className ? className : ''}`}
  >
    {text.applyToAcademy[lang]}
  </Button>
)
