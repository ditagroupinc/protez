import { forwardRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Button from '@/components/Button'

import AcademySection from '@/components/AcademySection'
import AcademyCard from './components/AcademyCard'

import texts from '@/texts&svg'

import { icons } from './icons'
import style from './style.module.scss'

import { AcademyIDs } from '../../consts'

const AcademyIntro = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const { mobile, width } = useScreenModeAndSize()

  const isMobile = width < 768 || mobile

  return (
    <AcademySection ref={ref} id={AcademyIDs.Intro} className={style.academyIntro}>
      <div className={style.overlay}></div>
      <div className={style.academyContent}>
        <div className={style.leftPart}>
          <div className={style.sectionTitle}>{icons.academyIntroTitle()}</div>
          <p className={style.academyDesc}>{texts.academyIntro.desc[lang]}</p>
          <div className={style.buttonGroup}>
            <Button
              as="link"
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target={'_blank'}
              variant="primary-blue"
              size={isMobile ? 'big' : 'small'}
              rel="noopener noreferrer"
            >
              {texts.academyHeader.buttons.applyToAcademy[lang]}
            </Button>
            <Button
              as="link"
              href="/donate"
              variant="secondary-white"
              size={isMobile ? 'big' : 'small'}
            >
              {texts.academyHeader.buttons.supportAcademy[lang]}
              {icons.arrowUp(`${style.arrowUp}`)}
            </Button>
          </div>
        </div>
        <div className={style.rightPart}>
          <AcademyCard
            image="/academiesLogo/minnesotaUniversity.svg"
            width={isMobile ? 157 : 182}
            height={isMobile ? 28 : 33}
            className={style.academyCard}
          />
          <AcademyCard
            image="/academiesLogo/centuryCollege.svg"
            width={isMobile ? 43 : 64}
            height={isMobile ? 59 : 86}
            className={style.academyCard}
          />
          <AcademyCard
            image="/academiesLogo/concordiaUniversity.svg"
            width={isMobile ? 151 : 172}
            height={isMobile ? 37 : 42}
            className={style.academyCard}
          />
        </div>
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  AcademyIntro.displayName = 'AcademyIntro'
}

export default AcademyIntro
