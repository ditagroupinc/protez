import { ReactNode } from 'react'
import Link from 'next/link'
import style from './style.module.scss'

interface SquareButtonProps {
  link?: boolean
  href?: string
  blank?: boolean
  pink?: boolean
  emptyBlack?: boolean
  black?: boolean
  className?: string
  onClick?: () => void
  children: ReactNode
}

const SquareButton = ({
  link = false,
  href = '',
  blank = false,
  pink = false,
  emptyBlack = false,
  black = false,
  className = '',
  onClick,
  children,
}: SquareButtonProps) => {
  if (link)
    return (
      <Link
        href={href}
        target={blank ? 'blank' : '_self'}
        type="button"
        className={`h6 ${style.button} ${pink ? style.pink : ''} ${
          emptyBlack ? style.emptyBlack : ''
        } ${black ? style.black : ''} ${className}`}
      >
        {children}
      </Link>
    )

  return (
    <button
      className={`h6 ${style.button} ${pink ? style.pink : ''} ${
        emptyBlack ? style.emptyBlack : ''
      } ${black ? style.black : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default SquareButton
