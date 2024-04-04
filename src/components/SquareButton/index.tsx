import { ReactNode, FunctionComponent } from 'react'
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
      <Link href={href} legacyBehavior>
        <a
          target={blank ? 'blank' : '_self'}
          className={`h6 ${style.button} ${pink ? style.pink : ''} ${
            emptyBlack ? style.emptyBlack : ''
          } ${black ? style.black : ''} ${className}`}
        >
          {children}
        </a>
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
