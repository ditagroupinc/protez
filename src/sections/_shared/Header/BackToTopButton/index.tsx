'use client'

import style from './style.module.scss'
import Link from 'next/link'

import { useTranslations } from 'next-intl'
import useBackToTopContrast from '@/hooks/useBackToTopContrast'

export default function BackToTopButton({
  href,
  className = '',
  black,
  color = 'red',
}: {
  href: string
  className?: string
  black?: boolean
  color: 'red' | 'blue' | 'teal'
}) {
  const t = useTranslations('shared')
  const contrast = useBackToTopContrast()

  return (
    <Link
      ref={contrast.ref}
      style={{ color: contrast.color }}
      className={`${style.button} ${black ? style.black : ''} ${style[color]} ${className}`}
      href={`#${href}`}
    >
      {t('backToTop')}
    </Link>
  )
}
