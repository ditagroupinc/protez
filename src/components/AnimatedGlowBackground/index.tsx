import style from './style.module.scss'

const AnimatedGlowBackground = () => (
  <div className={style.heroFx} aria-hidden="true">
    <span className={`${style.glow} ${style.g1}`} />
    <span className={`${style.glow} ${style.g2}`} />
    <span className={`${style.glow} ${style.g3}`} />
    <span
      className={style.spark}
      style={{ left: '16%', animationDuration: '10s', animationDelay: '0s' }}
    />
    <span
      className={style.spark}
      style={{ left: '34%', animationDuration: '12s', animationDelay: '3s' }}
    />
    <span
      className={style.spark}
      style={{ left: '52%', animationDuration: '9s', animationDelay: '1.5s' }}
    />
    <span
      className={style.spark}
      style={{ left: '64%', animationDuration: '13s', animationDelay: '5s' }}
    />
    <span
      className={style.spark}
      style={{ left: '80%', animationDuration: '11s', animationDelay: '2.5s' }}
    />
  </div>
)

export default AnimatedGlowBackground
