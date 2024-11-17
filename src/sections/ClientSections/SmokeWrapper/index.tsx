import { ReactNode } from 'react'

import style from './style.module.scss'
import Image from 'next/image'

const SmokeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <div className={style.smokeContainer} id="smoke">
        <div className={`${style.bg} ${style.smokeBg}`}>
          <Image
            // TODO: remove after review
            src="/protez/smokeBackground/smoke-bg-2.png"
            alt="smoke"
            width={1920}
            height={1080}
            className={style.image}
          />
        </div>
        <div className={`${style.bg} ${style.smoke}`}>
          <Image
            // TODO: remove after review
            src="/protez/smokeBackground/smoke-bg-2.png"
            alt="smoke"
            width={1920}
            height={1080}
            className={style.image}
          />
        </div>
      </div>
      <div className={style.filter} />
      {children}
    </div>
  )
}

export default SmokeWrapper
