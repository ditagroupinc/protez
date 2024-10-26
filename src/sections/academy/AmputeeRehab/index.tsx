import { icons } from './icons'
import style from './style.module.scss'

import Button from '@/components/Button'

import Image from 'next/image'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useLanguage } from '@/contexts/LanguageContext'
import { AcademyIDs } from '../../../../app/academy/consts'

const AmputeeRehab = () => {
  const { lang } = useLanguage()

  return (
    <section id={AcademyIDs.AmputeeRehab} className={style.amputeeRehab}>
      <Image
        // TODO: remove after review
        src="/protez/academyPage/amputeeRehab/summit.png"
        alt="summit"
        width={1920}
        height={880}
        layout="responsive"
        className={style.amputeeRehabImage}
      />

      <div className={style.amputeeRehabOverlay}>
        <div className={style.amputeeRehabContent}>
          <div className={style.left}>
            {icons.amputeeRehabLogo.desktop[lang](style.title)}
            <p className={style.desc}>
              Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam.
              Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc
              suspendisse donec varius integer nisi urna eu. Egestas et id nunc ultrices sit ut
            </p>
            <div className={style.buttons}>
              <Button
                as={'link'}
                variant="primary-blue"
                size="big"
                href={'/'}
                className={style.button}
              >
                Apply to Academy
              </Button>
              <Button
                as={'link'}
                variant="secondary-white"
                size="big"
                href={'/'}
                className={style.button}
              >
                Support Academy
                {icons.arrowUp(style.arrowUp)}
              </Button>
            </div>
          </div>
          <div className={style.right}>
            {icons.partnersLogos.map((logo, index) => (
              <TextAppearanceWrapper key={index} className={style.card}>
                {logo(style.partnerLogo)}
              </TextAppearanceWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AmputeeRehab
