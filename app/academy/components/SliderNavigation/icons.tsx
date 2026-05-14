const arrowLeft = (className?: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 16L10.7875 15.1938L6.15625 10.5625L16 10.5625V9.4375L6.15625 9.4375L10.7875 4.80625L10 4L4 10L10 16Z"
      fill="currentColor"
    />
  </svg>
)

const arrowRight = (className?: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 16L9.2125 15.1938L13.8438 10.5625H4V9.4375H13.8438L9.2125 4.80625L10 4L16 10L10 16Z"
      fill="currentColor"
    />
  </svg>
)

export const icons = {
  arrowLeft,
  arrowRight,
}
