import style from "./smokeBackground.module.css";

export default function SmokeBackground({ className }) {
  return (
    <div className={`${style.container} ${className}`}>
      <div className={`${style.bg} ${style.smokeBg}`} />
      <div className={`${style.bg} ${style.smoke}`} />
    </div>
  );
}
