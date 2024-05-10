'use client'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import style from './veteranFBIframe.module.css'
import icons from './icons'

export default function VeteranFBIframe({ iframeLink }) {
  const { mobile } = useScreenModeAndSize()
  const { lang } = useLanguage()

  return (
    <section className={`${style.section} section`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogo.mobile[lang](`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo.desktop[lang](`${style.logo} svgTextBlock`)}
      <iframe
        src={iframeLink}
        width="500"
        height="752"
        allowFullScreen
        // style="border:none;overflow:hidden"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className={style.iframe}
      />
    </section>
  )
}
