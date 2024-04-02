import Card from '@/components/Card'
import style from './OurMission.module.css'
import { useContext, forwardRef } from 'react'
import { LanguageContext } from '@/contexts/LanguageContext'

import { icons } from './icons'
import texts from '@/texts&svg'

const iconsObj = [icons.iconDisabledPerson, icons.iconHand, icons.iconHelpHeart, icons.iconPeople]
const OurMission = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext)
  return (
    <section className={`${style.section} section ${visible ? 'showText' : ''}`} id={id} ref={ref}>
      {/* <SmokeBackground /> */}
      <div className={`${style.block}`}>
        <div className={`${style.logo} textContainer`}>
          {icons.ourMissionLogo[lang](`"svgTextBlock" `)}
        </div>
        {Object.keys(texts.ourMission.blockInfo).map((key, i) => (
          <Card key={i} icon={iconsObj[i]} text={texts.ourMission.blockInfo[key][lang]} />
        ))}
      </div>
    </section>
  )
})

OurMission.displayName = 'OurMission'
export default OurMission
