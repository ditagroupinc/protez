import type { ReactNode } from 'react'
import style from './style.module.scss'

const SectionTitle = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => <h2 className={`${style.title} ${className}`}>{children}</h2>

export default SectionTitle
