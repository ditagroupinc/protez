import { LanguageContext } from '@/contexts/LanguageContext'
import { forwardRef, useContext } from 'react'

import style from './LetsGiveHope.module.css'
import { icons } from './icons'
import CompanyData from '@/components/CompanyData'
import VideoAndFilter from '@/components/VideoAndFilter'

const LetsGiveHope = forwardRef(function ({ id }, ref) {
  const { lang } = useContext(LanguageContext)
  return (
    <section className={`${style.section} section`} id={id} ref={ref}>
      <VideoAndFilter src={'flag-ukraine.mp4'} />
      <div className={style.logoContainer}>
        {icons.letsGiveHopeLogo[lang](`${style.mainTitle} svgTextBlock`)}
      </div>
      <CompanyData className={style.companyData} />
    </section>
  )
})
LetsGiveHope.displayName = 'LetsGiveHope'
export default LetsGiveHope
