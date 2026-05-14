import style from './style.module.scss'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

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
  const t = useAcademyTexts()

  return (
    <a
      className={`${style.button} h6 ${black ? style.black : ''} ${style[color]} ${className}`}
      href={`#${href}`}
    >
      {t.common.backToTop}
    </a>
  )
}
