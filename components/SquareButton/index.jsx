import style from "./style.module.css";
import Link from "next/link";

export default function SquareButton({
  pink,
  black,
  emptyBlack,
  className = "",
  onClick,
  text,
  link,
  blank,
  href,
}) {
  if (link && href)
    return (
      <Link
        href={href}
        target={blank ? "blank" : "_self"}
        type="button"
        className={`h6 ${style.button} ${pink ? style.pink : ""} ${
          emptyBlack ? style.emptyBlack : ""
        } ${black ? style.black : ""} ${className}`}
        onClick={onClick}
      >
        {text}
      </Link>
    );
  return (
    <button
      // type="button"
      className={`h6 ${style.button} ${pink ? style.pink : ""} ${
        emptyBlack ? style.emptyBlack : ""
      } ${black ? style.black : ""} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
