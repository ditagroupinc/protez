import style from './style.module.scss'
import texts from '@/texts&svg'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const { lang } = useLanguage()

  return (
    <a
      className={`${style.button} h6 ${black ? style.black : ''} ${style[color]} ${className}`}
      href={`#${href}`}
    >
      {texts.home.backToTop[lang]}
    </a>
  )
}
