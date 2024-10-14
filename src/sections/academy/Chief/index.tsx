import Section from '@/components/Section'
import style from './style.module.scss'
import { icons } from './icons'
import Image from 'next/image'
import { forwardRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { AcademyIDs } from '../../../../app/academy/consts'

const Chief = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <Section ref={ref} id={AcademyIDs.Chief} className={style.chief}>
      <div className={style.chiefContent}>
        <div className={style.left}>
          {width < 600
            ? icons.chiefLogo.mobile[lang](style.sectionTitle)
            : icons.chiefLogo.desktop[lang](style.sectionTitle)}

          <TextAppearanceWrapper className={style.profession}>
            CHIEF MEDICAL OFFICER, <br /> CERTIFIED PROSTHETIST AND ORTHOTIST
          </TextAppearanceWrapper>
          <TextAppearanceWrapper className={style.desc}>
            During the course of the program they will learn proven methods developed by the US
            healthcare practitioners over many years of treating veterans and also Dr. Yakov
            Gradinar’s personal technical know-how’s employed in his 15 years of practice. More
            importantly, the program is a way for overworked and underpaid Ukrainian doctors to come
            to the US where they will take a break from hearing sirens and rockets while learning
            practical skills to help many more Ukrainians in the future.
          </TextAppearanceWrapper>
          <ul className={style.socialLinkWrapper}>
            <li>
              <a
                href="https://www.instagram.com/yakovgradinar"
                target="blank"
                className={style.socialLink}
              >
                {icons.iconInstagram()}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yakov-gradinar-6aba10147"
                target="blank"
                className={style.socialLink}
              >
                {icons.iconLinkedin()}
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/yakovjacob.gradinar"
                target="blank"
                className={style.socialLink}
              >
                {icons.iconFacebook()}
              </a>
            </li>
          </ul>
        </div>
        <div className={style.right}>
          <Image
            // TODO: remove after review
            src="/protez/academyPage/chief/yakov-gradinar.png"
            alt="yakov-gradinar"
            width={672}
            height={880}
            className={style.image}
          />

          <div className={style.playBtnWrapper}>
            <button className={style.playBtn}>
              {icons.playText(style.spin)}
              {icons.play(style.playIcon)}
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
})

export default Chief
