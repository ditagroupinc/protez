const arrowUp = (className?: string) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.3998 35.7L10.2998 33.6L30.8998 13H11.9998V10H35.9998V34H32.9998V15.1L12.3998 35.7Z"
      fill="currentColor"
    ></path>
  </svg>
)

const arrowDown = (className?: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M0.795551 17.7661L0.822067 15.5122L13.9212 15.5122L5.52436e-05 1.59099L1.59105 -7.07035e-07L15.5122 13.9212L15.5122 0.822012L17.7661 0.795496L17.7661 17.7661L0.795551 17.7661Z"
      fill="white"
    />
  </svg>
)

// ===================================

export const icons = {
  arrowUp,
  arrowDown,
}
