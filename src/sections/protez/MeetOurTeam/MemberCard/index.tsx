import Image from 'next/image'
import style from './style.module.scss'

import { icons } from './icons'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { Body, H3 } from '@/components/Typography'

interface Links {
  facebook?: { href: string; icon: string }
  instagram?: { href: string; icon: string }
  linkedin?: { href: string; icon: string }
  email?: { href: string; icon: string }
}

export default function MemberCard({
  photo,
  links,
  name,
  position,
  className,
}: {
  photo: string
  links: Links
  name: string
  position: string
  className?: string
}) {
  const { width } = useScreenModeAndSize()

  return (
    <TextAppearanceWrapper
      isDisabled={width < 600}
      className={`${style.teamCard} ${className && className}`}
    >
      <Image
        // TODO: remove after review
        src={`/protez/protezPage/meetOurTeam/${photo}`}
        object-fit="contain"
        alt={photo}
        width={360}
        height={360}
        className={style.memberImage}
      />

      <H3 className={style.name}>{name}</H3>

      <Body className={style.position}>{position}</Body>
      <div className={`${style.linksList}`}>
        {Object.keys(links).map(platform => {
          const link = links[platform as keyof typeof links]

          return link ? (
            <a href={link.href} target="blank" key={platform}>
              {icons[link.icon as keyof typeof icons](style.icon)}
            </a>
          ) : (
            <div className={style.placeholder} key={platform} />
          )
        })}
      </div>
    </TextAppearanceWrapper>
  )
}
