import style from "./style.module.scss";
import Link from "next/link";

export default function SquareButton({
  pink,
  black,
  emptyBlack,
  className = "",
  onClick,
  children,
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
      >
        {children}
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
      {children}
    </button>
  );
}
