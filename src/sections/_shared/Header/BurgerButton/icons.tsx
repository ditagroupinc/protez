const menuClose = (className?: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    className={className}
  >
    <rect
      width="28"
      height="3"
      transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 11.1211 30.9199)"
      fill="#C31822"
    />
    <rect
      width="28"
      height="3"
      transform="matrix(0.707107 0.707107 0.707107 -0.707107 9 11.1211)"
      fill="#C31822"
    />
  </svg>
)

export const icons = {
  menuClose,
}
