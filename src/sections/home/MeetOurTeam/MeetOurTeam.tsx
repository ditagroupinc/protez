'use client'

import React, { useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import Section from '@/components/Section'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

import { icons } from './icons'

import Slider from '@/islands/SlickCarousel'

import { ProtezIDs } from '@/consts'

import { Body, H3 } from '@/components/Typography'
import ProtezImage from '@/components/ProtezImage'

interface Links {
  facebook?: { href: string; icon: 'facebook' }
  instagram?: { href: string; icon: 'instagram' }
  linkedin?: { href: string; icon: 'linkedin' }
  email?: { href: string; icon: 'email' }
}

interface MemberMeta {
  photo: string
  links: Links
}

type TeamMember = { name: string; position: string }

const membersMeta: MemberMeta[] = [
  {
    photo: 'yuryAroshidze.png',
    links: {
      facebook: { icon: 'facebook', href: 'https://www.facebook.com/yra.aroshidze' },
      instagram: { icon: 'instagram', href: 'https://www.instagram.com/u.aroshidze/' },
    },
  },
  {
    photo: 'yakovGradinar.png',
    links: {
      facebook: { icon: 'facebook', href: 'https://www.facebook.com/yakovjacob.gradinar' },
      instagram: { icon: 'instagram', href: 'https://www.i,nstagram.com/yakovgradinar/' },
    },
  },
  {
    photo: 'valentynaPavsyukova.png',
    links: {
      facebook: { icon: 'facebook', href: 'https://www.facebook.com/valentyna.pavsyukova/' },
      instagram: { icon: 'instagram', href: 'https://www.instagram.com/valentyna_pavsyukova/' },
      email: { icon: 'email', href: 'mailto:valentyna@protezfoundation.com' },
    },
  },
  {
    photo: 'andreyMadan.png',
    links: {
      facebook: { icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=13740119' },
      instagram: { icon: 'instagram', href: 'https://www.instagram.com/andrey.madan.mn/' },
      linkedin: { icon: 'linkedin', href: 'https://www.linkedin.com/in/andreymadan/' },
      email: { icon: 'email', href: 'mailto:andrey@protezfoundation.com' },
    },
  },
  {
    photo: 'ivannaGradniar.png',
    links: {
      email: { icon: 'email', href: 'mailto:aivanna@protezfoundation.com' },
    },
  },
  {
    photo: 'mykolaSarazhynskyy.png',
    links: {
      facebook: { icon: 'facebook', href: 'https://www.facebook.com/mykola.sarazhynskyy' },
      linkedin: { icon: 'linkedin', href: 'https://www.linkedin.com/in/mykolasarazhynskyy/' },
      email: { icon: 'email', href: 'mailto:mykola@protezfoundation.com' },
    },
  },
  {
    photo: 'tolyDzyuba.png',
    links: {
      linkedin: { icon: 'linkedin', href: 'https://www.linkedin.com/in/anatoliy-dzyuba-71880789/' },
      instagram: { icon: 'instagram', href: 'https://www.instagram.com/tolydzyuba/?hl=en' },
      email: { icon: 'email', href: 'mailto:toly@protezfoundation.com' },
    },
  },
  {
    photo: 'ruslanSychov.png',
    links: {
      facebook: { icon: 'facebook', href: 'https://www.facebook.com/ruslan.sychov' },
      instagram: { icon: 'instagram', href: 'https://www.instagram.com/ruslan.sychov/' },
      linkedin: { icon: 'linkedin', href: 'https://www.linkedin.com/in/ruslan-sychov/' },
      email: { icon: 'email', href: 'mailto:ruslan@protezfoundation.com' },
    },
  },
  {
    photo: 'zhannaDzyuba.png',
    links: {},
  },
  {
    photo: 'neliaSerianikova.png',
    links: {
      email: { icon: 'email', href: 'mailto:nelia@protezfoundation.com' },
    },
  },
  {
    photo: 'pavloKurynytskyi.png',
    links: {
      facebook: {
        icon: 'facebook',
        href: 'https://www.facebook.com/profile.php?id=100001740999825',
      },
      instagram: { icon: 'instagram', href: 'https://www.instagram.com/kurinitskii' },
      email: { icon: 'email', href: 'mailto:pavlo.kurynytskyi@protezfoundation.com' },
    },
  },
]

const MemberCard = ({
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
}) => {
  return (
    <TextAppearanceWrapper className={`${style.memberCard} ${className && className}`}>
      <ProtezImage
        src={`protezPage/meetOurTeam/${photo}`}
        alt={photo}
        width={360}
        height={360}
        className={style.memberImage}
      />

      <H3 className={style.memberName}>{name}</H3>

      <Body className={style.memberPosition}>{position}</Body>
      <div className={`${style.memberLinksList}`}>
        {Object.keys(links).map(platform => {
          const link = links[platform as keyof typeof links]

          return link ? (
            <a href={link.href} target="blank" key={platform}>
              {icons[link.icon](style.memberIcon)}
            </a>
          ) : (
            <div className={style.memberPlaceholder} key={platform} />
          )
        })}
      </div>
    </TextAppearanceWrapper>
  )
}

const MeetOurTeam = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.meetOurTeam')
  const teamMembers = t.raw('members') as TeamMember[]

  const members = teamMembers.map((member, index) => ({ ...member, ...membersMeta[index] }))

  const sliderRef = useRef(null)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '22px',

    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Section id={ProtezIDs.MeetOurTeam} className={style.section}>
      <div className={style.mobileTeam}>
        {icons.meetOurTeamLogo.desktop[lang](style.title)}

        <TextAppearanceWrapper>
          <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
            {members.map((card, index) => (
              <div key={index}>
                <div className={style.cardWrapper}>
                  <MemberCard
                    className={style.teamCard}
                    photo={card.photo}
                    links={card.links}
                    name={card.name}
                    position={card.position}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </TextAppearanceWrapper>
      </div>
      <div className={`${style.row} ${style.firstRow}`}>
        <div className={style.titleCell}>{icons.meetOurTeamLogo.desktop[lang](style.title)}</div>
        {members.slice(0, 2).map((card, index) => (
          <MemberCard
            key={index}
            className={style.teamCard}
            photo={card.photo}
            links={card.links}
            name={card.name}
            position={card.position}
          />
        ))}
      </div>
      <div className={`${style.row} ${style.secondRow}`}>
        {members.slice(2, 11).map((card, index) => (
          <MemberCard
            key={index}
            className={style.teamCard}
            photo={card.photo}
            links={card.links}
            name={card.name}
            position={card.position}
          />
        ))}
      </div>
    </Section>
  )
}

export default MeetOurTeam
