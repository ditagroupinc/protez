import { ReactNode } from 'react'

import style from './style.module.scss'
import SmokeBackground from '@/components/SmokeBackground'

const SmokeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <SmokeBackground className={style.smoke} />
      <div className={style.filter} />
      {children}
    </div>
  )
}

export default SmokeWrapper
