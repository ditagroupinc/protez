import style from "./backToTopButton.module.scss";

export default function BackToTopButton({ text, href, className = "", black }) {
  return (
    <a
      className={`${style.button} h6 ${black ? style.black : ""} ${className}`}
      href={`#${href}`}
    >
      {text}
    </a>
  );
}
