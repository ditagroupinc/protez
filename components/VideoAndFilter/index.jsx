import style from "./VideoAndFilter.module.css";
export default function VideoAndFilter({ src, className = "" }) {
  return (
    <>
      <video
        autoPlay
        preload
        loop
        muted
        playsInline
        className={`${style.video} ${className}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={style.filter} />
    </>
  );
}
