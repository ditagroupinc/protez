import React, { useEffect, useRef, forwardRef, ForwardedRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.css'
import TeamCard from '@/sections/OurTeam/components/TeamCard'
import { icons } from './icons.js'
import texts from '@/texts&svg'

const OurTeam = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const scrollableContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (width < 600 && scrollableContainer.current) {
      scrollableContainer.current.scrollLeft += 50
    }
  }, [width])

  const membersList = Object.values(texts.ourTeam.members)

  return (
    <section className={`${style.section} section`} id="ourTeam" ref={ref}>
      <div className={style.container}>
        <TextAppearanceWrapper>
          {icons.ourTeamLogo[lang](`${style.logo} svgTextBlock`)}
        </TextAppearanceWrapper>
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
