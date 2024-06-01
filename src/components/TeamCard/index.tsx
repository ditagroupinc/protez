import Image from 'next/image'
import style from './style.module.css'

import globalIcons from '@/texts&svg/icons'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

interface Links {
  facebook?: { href: string; icon: string }
  instagram?: { href: string; icon: string }
  linkedin?: { href: string; icon: string }
  email?: { href: string; icon: string }
}

export default function TeamCard({
  photo,
  links,
  name,
  position,
  black,
  className,
  teacher,
}: {
  photo: string
  links: Links
  name: string
  position: string
  black?: boolean
  className?: string
  teacher?: boolean
}) {
  const cardColor = () => (black ? '#0D1125' : '#fff')

  return (
    <div className={`${style.teamCard} ${className && className}`}>
      <Image
        src={`/${teacher ? 'teachers' : 'team'}/${photo}`}
        object-fit="contain"
        alt="Picture of the author"
        width={264}
        height={220}
      />
      <TextAppearanceWrapper className={`${style.container} ${black && style.black}`}>
        <div className={`${style.linksList}`}>
          {Object.keys(links).map(platform => {
            const link = links[platform as keyof typeof links]

            return link ? (
              <a href={link.href} target="blank" key={platform}>
                {globalIcons[link.icon as keyof typeof globalIcons](style.icon, cardColor())}
              </a>
            ) : (
              <div className={style.placeholder} key={platform} />
            )
          })}
        </div>
        <h5 className={`h5 ${style.name}`}>{name}</h5>

        <h6 className={`h6 ${style.position}`}>{position}</h6>
      </TextAppearanceWrapper>
    </div>
  )
}
