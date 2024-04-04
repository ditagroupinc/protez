import { useContext, forwardRef } from 'react'
import { LanguageContext } from '@/contexts/LanguageContext'
import { ScreenModeAndSizeContext } from '@/contexts/ScreenModeAndSizeContext'
import { useRef, useEffect } from 'react'
import style from './ourTeam.module.css'
import TeamCard from '@/components/TeamCard'
import { icons } from './icons.js'
import texts from '@/texts&svg'

const OurTeam = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext)
  const { width } = useContext(ScreenModeAndSizeContext)
  const scrollableContainer = useRef(null)
  useEffect(() => {
    if (width < 600) scrollableContainer.current.scrollLeft += 50
  }, [width])

  const membersList = Object.keys(texts.ourTeam.members).map(e => texts.ourTeam.members[e])
  return (
    <section className={`${style.section} section ${visible ? 'showText' : ''}`} id={id} ref={ref}>
      <div className={style.container}>
        <div className="textContainer">{icons.ourTeamLogo[lang](`${style.logo} svgTextBlock`)}</div>
        <div className={style.membersContainer}>
          {texts.ourTeam.executives.map((card, index) => (
            <TeamCard
              key={index}
              photo={card.photo}
              links={card.links}
              name={card.name[lang]}
              position={card.position[lang]}
              black
            />
          ))}
        </div>
      </div>
      {membersList.map((row, index) => (
        <div
          key={index}
          className={`${style.membersContainer} ${
            width < 600 && row.length > 3 ? style.scrollable : ''
          }`}
          ref={scrollableContainer}
        >
          {row.map((card, index) => (
            <TeamCard
              key={index}
              photo={card.photo}
              links={card.links}
              name={card.name[lang]}
              position={card.position[lang]}
              black
            />
          ))}
        </div>
      ))}
    </section>
  )
})

OurTeam.displayName = 'OurTeam'
export default OurTeam
