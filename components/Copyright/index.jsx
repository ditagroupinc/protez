import style from "./copyright.module.css";
export default function Copyright() {
  return (
    <a
      href="https://dita-group.com/"
      target="blank"
      className={style.copyright}
    >
      <span className={style.copyrightText}>
        2023 © Made by DITA GROUP Inc.
      </span>
    </a>
  );
}
