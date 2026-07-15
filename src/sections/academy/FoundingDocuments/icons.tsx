import { CSSProperties } from 'react'

type IconProps = {
  className?: string
  outlineClassName?: string
  lettersClassName?: string
  style?: CSSProperties
}

export const PdfIcon = ({ className, outlineClassName, lettersClassName, style }: IconProps) => (
  <svg
    className={className}
    style={style}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g className={outlineClassName}>
      <path
        d="M28.5 4H13C11.6739 4 10.4021 4.52678 9.46447 5.46447C8.52678 6.40215 8 7.67392 8 9V39C8 40.3261 8.52678 41.5979 9.46447 42.5355C10.4021 43.4732 11.6739 44 13 44H35C36.3261 44 37.5979 43.4732 38.5355 42.5355C39.4732 41.5979 40 40.3261 40 39V15.5L28.5 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M28 4V12C28 13.0609 28.4214 14.0783 29.1716 14.8284C29.9217 15.5786 30.9391 16 32 16H40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="10" y="24" width="28" height="12" rx="2" fill="currentColor" />
    </g>
    <path
      className={lettersClassName}
      d="M14.5 33V27H16.9C17.6 27 18.15 27.2 18.55 27.6C18.95 28 19.15 28.5 19.15 29.1C19.15 29.7 18.95 30.2 18.55 30.6C18.15 31 17.6 31.2 16.9 31.2H15.9V33H14.5ZM15.9 30H16.8C17.05 30 17.25 29.925 17.4 29.775C17.55 29.625 17.625 29.4333 17.625 29.2C17.625 28.9667 17.55 28.775 17.4 28.625C17.25 28.475 17.05 28.4 16.8 28.4H15.9V30ZM20 33V27H22.2C23.1667 27 23.925 27.275 24.475 27.825C25.025 28.375 25.3 29.1 25.3 30C25.3 30.9 25.025 31.625 24.475 32.175C23.925 32.725 23.1667 33 22.2 33H20ZM21.4 31.6H22.15C22.65 31.6 23.05 31.4667 23.35 31.2C23.65 30.9333 23.8 30.5333 23.8 30C23.8 29.4667 23.65 29.0667 23.35 28.8C23.05 28.5333 22.65 28.4 22.15 28.4H21.4V31.6ZM26.15 33V27H30.2V28.4H27.55V29.4H29.85V30.8H27.55V33H26.15Z"
    />
  </svg>
)
