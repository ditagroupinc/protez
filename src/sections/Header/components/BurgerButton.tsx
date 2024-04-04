import style from './style.module.scss'
import { icons } from './icons'

export const BurgerButton = ({
  close,
  onClick,
  isBlack,
}: {
  close: boolean
  onClick: () => void
  isBlack: boolean
}) => {
  if (!close) {
    return (
      <button className={`${style.burgerButton} ${isBlack && style.black}`} onClick={onClick}>
        <span />
        <span />
        <span />
      </button>
    )
  } else {
    return (
      <button className={`${style.burgerButton} ${isBlack && style.black}`} onClick={onClick}>
        {icons.menuClose()}
      </button>
    )
  }
}
