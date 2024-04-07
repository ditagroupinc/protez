import { forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.css'
import { icons } from './icons'
import CompanyData from '@/components/CompanyData'
import VideoAndFilter from '@/components/VideoAndFilter'

const LetsGiveHope = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()

  return (
    <section className={`${style.section} section`} id="letsGiveHope" ref={ref}>
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
