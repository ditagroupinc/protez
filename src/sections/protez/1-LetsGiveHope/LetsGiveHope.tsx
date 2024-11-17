import { forwardRef, ForwardedRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import VideoAndFilter from '@/components/VideoAndFilter'
import Section from '@/components/Section'
import { Body } from '@/components/Typography'
import ProtezButton, { MakeDonationButton } from '@/components/ProtezButton'

import { ProtezIDs } from '@/consts'
import style from './style.module.scss'
import { icons } from './icons'

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
  protezAcademy: {
    english: 'Protez Academy',
    ukrainian: 'Protez Academy',
  },
}

const LetsGiveHope = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const isDesktop = width > 1180

  const title = width > 800 ? icons.letsGiveHopeLogo.desktop : icons.letsGiveHopeLogo.mobile

  return (
    <Section id={ProtezIDs.LetsGiveHope} className={style.section} ref={ref}>
      <VideoAndFilter src={'flag-ukraine.mp4'} />
      <div className={style.overlay} />
      <div className={style.container}>
        <div className={style.left}>
          {icons.protezLogo(style.logo)}
          <Body large={isDesktop} className={style.description}>
            {letsGiveHopeText.description[lang]}
          </Body>
          <div className={style.buttonsContainer}>
            <MakeDonationButton lang={lang} size="normal" />
            <ProtezButton variant="secondary-white" as="link" href="/" size="normal" arrow>
              {letsGiveHopeText.needAProthesis[lang]}
            </ProtezButton>
            {!isDesktop && (
              <ProtezButton variant="secondary-white" as="link" href="/" size="normal">
                {letsGiveHopeText.protezAcademy[lang]}
              </ProtezButton>
            )}
          </div>
        </div>
        <div className={style.right}>{title[lang](style.title)}</div>
      </div>
    </Section>
  )
})

LetsGiveHope.displayName = 'LetsGiveHope'
export default LetsGiveHope
