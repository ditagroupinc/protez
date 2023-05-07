import style from "./style.module.css";

export default function SquareButton({
  pink,
  black,
  className,
  onClick,
  text,
  link,
  href,
}) {
  if (link && href)
    return (
      <a
        href={href}
        target="blank"
        type="button"
        className={`h6 ${style.button} ${pink ? style.pink : ""} ${
          black ? style.black : ""
        } ${className}`}
        onClick={onClick}
      >
        {text}
      </a>
    );
  return (
    <button
      type="button"
      className={`h6 ${style.button} ${pink ? style.pink : ""} ${
        black ? style.black : ""
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
