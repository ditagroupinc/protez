import { forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import style from './style.module.css'
import icons from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Link from 'next/link'
import texts from '@/texts&svg'

import PartnerCard from './components/PartnerCard'

const OurPartners = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()
  const { tabletLarge } = useScreenModeAndSize()

  return (
    <section className={`${style.section} section`} id="ourPartners" ref={ref}>
      <div className={style.container}>
        <TextAppearanceWrapper className={style.specialThanks}>
          {tabletLarge
            ? icons.specialThanksLogo.tablet[lang](`${style.logo} svgTextBlock`)
            : icons.specialThanksLogo.desktop[lang](`${style.logo} svgTextBlock`)}
        </TextAppearanceWrapper>
        <PartnerCard image="directRelief.svg" />

        <div>
          <Link href="/partners" className={`${style.discoverCard} h3`}>
            <p>{texts.ourPartners.discover[lang]}</p>
            {icons.arrow()}
          </Link>
        </div>

        <PartnerCard image="esper.svg" />
        <PartnerCard image="klmb.svg" />
        <PartnerCard image="antonovGroup.svg" />
        <PartnerCard dita />
        <PartnerCard image="chaliceOfMercy.svg" />
      </div>
    </section>
  )
})

OurPartners.displayName = 'OurPartners'
export default OurPartners
