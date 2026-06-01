'use client'

import style from './style.module.scss'
import { useTranslations } from 'next-intl'

export default function BackToTopButton({
  href,
  className = '',
  black,
  color = 'pink',
}: {
  href: string
  className?: string
  black?: boolean
  color?: 'pink' | 'blue'
}) {
  const t = useTranslations('academy.common')

  return (
    <a
      className={`${style.button} h6 ${black ? style.black : ''} ${style[color]} ${className}`}
      href={`#${href}`}
    >
      {t('backToTop')}
    </a>
  )
}
