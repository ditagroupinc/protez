'use client'

import { ComponentProps, ReactElement, ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import style from './style.module.scss'
// Locale-aware Link: internal hrefs get the /ua prefix, external URLs and
// #anchors pass through untouched.
import { Link } from '@/lib/i18n'

type LinkProps = ComponentProps<typeof Link>

import { icons } from './icons'

// =================================================================

type ButtonVariant =
  | 'primary-red'
  | 'primary-white'
  | 'secondary-white'
  | 'secondary-black'
  | 'primary-blue'
  | 'primary-black'
  | 'secondary-blue'
  | 'primary-teal'
  | 'secondary-teal'

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
        external?: false
        className?: string
        children: ReactNode
        target?: '_blank' | '_self' | '_parent' | '_top'
        rel?: string
      })
    | (React.ComponentProps<'a'> & {
        as: 'link'
        external: true
        className?: string
        children: ReactNode
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

  'primary-teal': 'primaryTeal',
  'secondary-teal': 'secondaryTeal',
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
    const classNames = `${style.button} ${props.arrow ? style.hasArrow : ''} ${style[variantStyles[props.variant]]} ${style[props.size]} ${props.squared ? style.squared : ''} ${props.className}`

    if (props.external) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, external, variant, size, squared, className, children, arrow, ...rest } = props

      return (
        <a className={classNames} {...rest}>
          {children}
          {arrow && icons.arrow(style.icon)}
        </a>
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, external, variant, size, squared, className, children, arrow, ...rest } = props

    return (
      <Link prefetch={false} className={classNames} {...rest}>
        {children}
        {arrow && icons.arrow(style.icon)}
      </Link>
    )
  }

  return null
}

export default Button

export const MakeDonationButton = ({
  className,
  size,
  variant = 'primary-red',
}: {
  className?: string
  size: ButtonSize
  variant?: ButtonVariant
}) => {
  const t = useTranslations('shared.buttons')

  return (
    <Button
      as="link"
      href="/donate"
      target={'_blank'}
      variant={variant}
      size={size}
      rel="noopener noreferrer"
      className={`${className ? className : ''}`}
    >
      {t('makeDonation')}
    </Button>
  )
}

export const SupportWithAmazonButton = ({
  className,
  color = 'black',
  size,
}: {
  className?: string
  color?: 'white' | 'black'
  size: ButtonSize
}) => {
  const t = useTranslations('shared.buttons')

  return (
    <Button
      as="link"
      href="https://www.amazon.com/hz/wishlist/ls/3S6RESSKHZZH7/ref=hz_ls_biz_ex"
      size={size}
      variant={color === 'white' ? 'secondary-white' : 'secondary-black'}
      className={`${className ? className : ''}`}
    >
      {t('supportWith')}

      {icons.amazon(style.icon)}
    </Button>
  )
}

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
  className,
  size,
}: {
  className?: string
  size: ButtonSize
}) => {
  const t = useTranslations('shared.buttons')

  return (
    <Button
      as="link"
      href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
      target="_blank"
      variant="primary-blue"
      size={size}
      rel="noopener noreferrer"
      className={`${className ? className : ''}`}
    >
      {t('applyToAcademy')}
    </Button>
  )
}
