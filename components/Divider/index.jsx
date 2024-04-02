import style from './divider.module.css'
export default function Divider({ vertical, className = '' }) {
  return (
    <div
      className={`${style.divider} ${vertical ? style.vertical : style.horizontal} ${className}`}
    />
  )
}
