const menuClose = (className?: string) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9.84615 32L8 30.1538L18.1538 20L8 9.84615L9.84615 8L20 18.1538L30.1538 8L32 9.84615L21.8462 20L32 30.1538L30.1538 32L20 21.8462L9.84615 32Z"
      fill="#CD0062"
    />
  </svg>
)

export const icons = {
  menuClose: menuClose,
}
