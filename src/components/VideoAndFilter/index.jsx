import style from './style.module.scss'
export default function VideoAndFilter({ src, className = '' }) {
  return (
    <>
      <video autoPlay loop muted playsInline className={`${style.video} ${className}`}>
        <source src={src} type="video/mp4" />
      </video>
      <div className={style.filter} />
    </>
  )
}
