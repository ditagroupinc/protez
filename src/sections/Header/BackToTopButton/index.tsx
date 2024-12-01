import style from './style.module.scss'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const text = {
  english: 'Back to top   →',
  ukrainian: 'Нагору   →',
}

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
  const { lang } = useLanguage()

  return (
    <Link
      className={`${style.button} ${black ? style.black : ''} ${style[color]} ${className}`}
      href={`#${href}`}
    >
      {text[lang]}
    </Link>
  )
}
