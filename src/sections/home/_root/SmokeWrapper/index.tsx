import { ReactNode } from 'react'

import style from './style.module.scss'
import ProtezImage from '@/components/ProtezImage'

const SmokeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <div className={style.smokeContainer} id="smoke">
        <div className={`${style.bg} ${style.smokeBg}`}>
          <ProtezImage
            src="smokeBackground/smoke-bg-2.png"
            alt="smoke"
            width={1370}
            height={1501}
            className={style.image}
          />
        </div>
        <div className={`${style.bg} ${style.smoke}`}>
          <ProtezImage
            src="smokeBackground/smoke-bg-2.png"
            alt="smoke"
            width={1370}
            height={1501}
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
