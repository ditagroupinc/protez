import { ReactNode } from 'react'

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

type ButtonSize = 'small' | 'normal'

type BaseButtonProps = {
  variant: ButtonVariant
  size?: ButtonSize
  arrow?: boolean
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
  'primary-black': 'primaryBlack',
  'secondary-black': 'secondaryBlack',
  'primary-blue': 'primaryBlue',
}

// =================================================================

const ProtezButton = (props: ButtonProps) => {
  if (props.as === 'button') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant, size = 'normal', className, children, arrow, ...rest } = props

    return (
      <button
        className={`${style.button} ${style[variantStyles[variant]]} ${style[size]} ${className}`}
        {...rest}
      >
        {children}
        {arrow && icons.arrow(style.icon)}
      </button>
    )
  }

  if (props.as === 'link') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant, size = 'big', className, children, arrow, ...rest } = props

    return (
      <Link
        prefetch={false}
        className={`${style.button} ${style[variantStyles[variant]]} ${style[size]} ${className}`}
        {...rest}
      >
        {children}
        {arrow && icons.arrow(style.icon)}
      </Link>
    )
  }

  return null
}

export default ProtezButton

const buttonTexts = {
  makeDonation: {
    english: 'Make Donation',
    ukrainian: 'Зробити внесок!',
  },

  supportWith: {
    english: 'Support with',
    ukrainian: 'Підтримати з',
  },
}

export const MakeDonationButton = ({
  lang,
  className,
}: {
  lang: Languages
  className?: string
}) => (
  <ProtezButton
    as="link"
    href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
    target={'_blank'}
    variant="primary-red"
    size="small"
    rel="noopener noreferrer"
    className={`${className ? className : ''}`}
  >
    {buttonTexts.makeDonation[lang]}
  </ProtezButton>
)

export const SupportWithAmazonButton = ({
  lang,
  className,
  color = 'black',
}: {
  lang: Languages
  className?: string
  color?: 'white' | 'black'
}) => (
  <ProtezButton
    as="link"
    href="/"
    variant={color === 'white' ? 'secondary-white' : 'secondary-black'}
    className={`${className ? className : ''}`}
  >
    {buttonTexts.supportWith[lang]}

    {icons.amazon(style.icon)}
  </ProtezButton>
)
