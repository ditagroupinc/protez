import style from './style.module.scss'
import { icons } from './icons'

export const BurgerButton = ({
  close,
  onClick,
  isBlack,
  color = 'pink',
}: {
  close: boolean
  onClick: () => void
  isBlack: boolean
  color?: 'pink' | 'blue'
}) => {
  const btnClassName = `${style.burgerButton} ${isBlack && style.black} ${style[color]}`

  if (!close) {
    return (
      <button className={btnClassName} onClick={onClick}>
        <span />
        <span />
        <span />
      </button>
    )
  }

  return (
    <button className={btnClassName} onClick={onClick}>
      {icons.menuClose(`${color === 'pink' ? style.iconPink : style.iconBlue}`)}
    </button>
  )
}
