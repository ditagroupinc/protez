import style from './style.module.scss'
import { icons } from './icons'

type ButtonColor = 'blue' | 'red'

export const BurgerButton = ({
  close,
  onClick,
  isBlack = false,
  color = 'red',
}: {
  close: boolean
  onClick: () => void
  isBlack?: boolean
  color?: ButtonColor
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
      {icons.menuClose(style[color])}
    </button>
  )
}
