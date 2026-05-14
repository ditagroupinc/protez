import ProtezVideo from '@/components/ProtezVideo'
import style from './style.module.scss'
export default function VideoAndFilter({ src, className = '' }) {
  return (
    <>
      <ProtezVideo
        autoPlay
        loop
        muted
        playsInline
        className={`${style.video} ${className}`}
        src={src}
      />

      <div className={style.filter} />
    </>
  )
}
