import style from './style.module.scss'

const Divider = ({ vertical, className = '' }: { vertical?: boolean; className?: string }) => {
  return (
    <div
      className={`${style.divider} ${vertical ? style.vertical : style.horizontal} ${className}`}
    />
  )
}

export default Divider
