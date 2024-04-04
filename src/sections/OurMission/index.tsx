import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useContext, forwardRef, Ref } from 'react'
import { LanguageContext } from '@/contexts/LanguageContext'
import Card from '@/components/Card'
import style from './style.module.css'
import { icons } from './icons'
import texts from '@/texts&svg'

const iconsObj = [icons.iconDisabledPerson, icons.iconHand, icons.iconHelpHeart, icons.iconPeople]

interface BlockInfo {
  [key: string]: {
    english: string
    ukrainian: string
  }
}

const OurMission = forwardRef<HTMLDivElement>(function ({}, ref) {
  const { lang } = useContext(LanguageContext)
  const blockInfo: BlockInfo = texts.ourMission.blockInfo
  return (
    <section className={`${style.section} section`} id="ourMission" ref={ref}>
      <div className={`${style.block}`}>
        <TextAppearanceWrapper className={style.logo}>
          {icons.ourMissionLogo[lang](`"svgTextBlock" `)}
        </TextAppearanceWrapper>

        {Object.keys(blockInfo).map((key, i) => (
          <Card key={i} icon={iconsObj[i]} text={blockInfo[key][lang]} />
        ))}
      </div>
    </section>
  )
})

OurMission.displayName = 'OurMission'
export default OurMission
