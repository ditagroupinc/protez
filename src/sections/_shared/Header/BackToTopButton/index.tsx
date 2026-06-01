import style from './style.module.scss'
import Link from 'next/link'

import { useSharedTexts } from '@/hooks/useSharedTexts'

export default function BackToTopButton({
  href,
  className = '',
  black,
  color = 'red',
}: {
  href: string
  className?: string
  black?: boolean
  color: 'red' | 'blue'
}) {
  const t = useSharedTexts()

  return (
    <Link
      className={`${style.button} ${black ? style.black : ''} ${style[color]} ${className}`}
      href={`#${href}`}
    >
      {t.backToTop}
    </Link>
  )
}
