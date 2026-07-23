import { playfairDisplayItalic } from '../../../../../app/fonts'
import style from './style.module.scss'

type Props = {
  as?: 'h1' | 'h2'
  serif: string
  bold: string
  className?: string
}

const SplitHeading = ({ as = 'h2', serif, bold, className }: Props) => {
  const Tag = as

  return (
    <Tag className={`${style.heading} ${style[as]} ${className ?? ''}`}>
      <span className={`${style.serif} ${playfairDisplayItalic.className}`}>{serif}</span>
      <span className={style.bold}>{bold}</span>
    </Tag>
  )
}

export default SplitHeading
