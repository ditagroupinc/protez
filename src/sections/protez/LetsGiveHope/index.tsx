import { forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
// import CompanyData from '@/components/CompanyData'
import VideoAndFilter from '@/components/VideoAndFilter'
import Section from '@/components/Section'
import { Body } from '@/components/Typography'
import ProtezButton, { MakeDonationButton } from '@/components/ProtezButton'
import { ProtezIDs } from '../consts'

const letsGiveHopeText = {
  description: {
    english:
      'We provide state of the art prosthetics with personalized training and support in the US and follow-up care in Ukraine.',
    ukrainian:
      'We provide state of the art prosthetics with personalized training and support in the US and follow-up care in Ukraine.',
  },
  needAProthesis: {
    english: 'Потрібeн протез',
    ukrainian: 'Потрібeн протез',
  },
}

const LetsGiveHope = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()

  return (
    <Section id={ProtezIDs.LetsGiveHope} className={style.section} ref={ref}>
      <VideoAndFilter src={'flag-ukraine.mp4'} />
      <div className={style.overlay} />

      <div className={style.left}>
        {icons.protezLogo(style.logo)}
        <Body large className={style.description}>
          {letsGiveHopeText.description[lang]}
        </Body>
        <div className={style.buttonsContainer}>
          <MakeDonationButton lang={lang} />
          <ProtezButton variant="secondary-white" as="link" href="/" arrow>
            {letsGiveHopeText.needAProthesis[lang]}
          </ProtezButton>
        </div>
      </div>
      <div className={style.right}>{icons.letsGiveHopeLogo.desktop[lang](style.title)}</div>
    </Section>
  )
})

LetsGiveHope.displayName = 'LetsGiveHope'
export default LetsGiveHope
