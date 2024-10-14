import Image from 'next/image'
import style from './style.module.scss'

import globalIcons from '@/texts&svg/icons'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

interface Links {
  facebook?: { href: string; icon: string }
  instagram?: { href: string; icon: string }
  linkedin?: { href: string; icon: string }
  email?: { href: string; icon: string }
}

export default function TeacherCard({
  photo,
  links,
  name,
  position,
  black,
  className,
}: {
  photo: string
  links: Links
  name: string
  position: string
  black?: boolean
  className?: string
}) {
  const { width } = useScreenModeAndSize()
  const cardColor = () => (black ? '#0D1125' : '#fff')

  return (
    <TextAppearanceWrapper
      isDisabled={width < 600}
      className={`${style.teamCard} ${className && className}`}
    >
      <Image
        // TODO: remove after review
        src={`/protez/academyPage/teachers/${photo}`}
        object-fit="contain"
        alt={photo}
        width={345}
        height={300}
        className={style.teacherImage}
      />
      <div className={`${style.container} ${black && style.black}`}>
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
      </div>
    </TextAppearanceWrapper>
  )
}
