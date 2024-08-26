import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useLanguage } from '@/contexts/LanguageContext'
import Card from '@/components/Card'
import style from './style.module.css'
import { icons } from './icons'
import texts from '@/texts&svg'
import { BilingualText } from '@/types'

const iconsObj = [icons.iconDisabledPerson, icons.iconHand, icons.iconHelpHeart, icons.iconPeople]

interface BlockInfo {
  [key: string]: BilingualText
}

const OurMission = () => {
  const { lang } = useLanguage()
  const blockInfo: BlockInfo = texts.ourMission.blockInfo

  return (
    <section className={`${style.section} section`} id="ourMission">
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
}

export default OurMission
