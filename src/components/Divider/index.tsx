import { FunctionComponent } from 'react'
import style from './style.module.css'

const Divider = ({ vertical, className = '' }: { vertical?: boolean; className?: string }) => {
  return (
    <div
      className={`${style.divider} ${vertical ? style.vertical : style.horizontal} ${className}`}
    />
  )
}

export default Divider
