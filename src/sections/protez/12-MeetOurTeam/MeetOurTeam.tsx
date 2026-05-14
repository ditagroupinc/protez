import React, { useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Section from '@/components/Section'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import style from './style.module.scss'

import { icons } from './icons'

import Slider from 'react-slick'

import { ProtezIDs } from '@/consts'
// import { SeeAllButton } from '@/components/Button'

import { Body, H3 } from '@/components/Typography'
import { BilingualText } from '@/types'
import ProtezImage from '@/components/ProtezImage'

interface Links {
  facebook?: { href: string; icon: 'facebook' }
  instagram?: { href: string; icon: 'instagram' }
  linkedin?: { href: string; icon: 'linkedin' }
  email?: { href: string; icon: 'email' }
}

interface Member {
  name: BilingualText
  position: BilingualText
  photo: string
  links: Links
}

const meetOurTeamSection: {
  // discover: BilingualText
  members: Member[]
} = {
  // discover: {
  //   english: 'Discover all team',
  //   ukrainian: 'Дізнатися про всю команду',
  // },
  members: [
    {
      photo: 'yuryAroshidze.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/yra.aroshidze',
        },

        instagram: {
          icon: 'instagram',
          href: 'https://www.instagram.com/u.aroshidze/',
        },
      },
      name: {
        english: 'Yura Aroshidze',
        ukrainian: 'Юрій Арошідзе',
      },
      position: {
        english: 'Co-Founder, CEO “Protez Foundation”',
        ukrainian: 'Співзасновник, CEO “Protez Foundation”',
      },
    },
    {
      photo: 'yakovGradinar.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/yakovjacob.gradinar',
        },
        instagram: {
          icon: 'instagram',
          href: 'https://www.i,nstagram.com/yakovgradinar/',
        },
      },
      name: {
        english: 'Yakov Gradinar',
        ukrainian: 'Яков Градинар',
      },
      position: {
        english: 'Co-Founder, Certified Prosthetist and Orthotist & Chief Medical Officer',
        ukrainian: 'Співзасновник, сертифікований протезист-ортезист та головний лікар',
      },
    },
    {
      photo: 'valentynaPavsyukova.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/valentyna.pavsyukova/',
        },

        instagram: {
          icon: 'instagram',
          href: 'https://www.instagram.com/valentyna_pavsyukova/',
        },

        email: {
          icon: 'email',
          href: 'mailto:valentyna@protezfoundation.com',
        },
      },
      name: {
        english: 'Valentyna Pavsyukova',
        ukrainian: 'Валентина Павсюкова',
      },
      position: {
        english: 'Strategic Advisor',
        ukrainian: 'Стратегічний консультант',
      },
    },
    {
      photo: 'andreyMadan.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/profile.php?id=13740119',
        },
        instagram: {
          icon: 'instagram',
          href: 'https://www.instagram.com/andrey.madan.mn/',
        },
        linkedin: {
          icon: 'linkedin',
          href: 'https://www.linkedin.com/in/andreymadan/',
        },
        email: {
          icon: 'email',
          href: 'mailto:andrey@protezfoundation.com',
        },
      },
      name: {
        english: 'Andrey Madan',
        ukrainian: 'Андрій Мадан',
      },
      position: {
        english: 'Executive Program Director',
        ukrainian: 'Виконавчий директор',
      },
    },
    {
      photo: 'ivannaGradniar.png',
      links: {
        email: {
          icon: 'email',
          href: 'mailto:aivanna@protezfoundation.com',
        },
      },
      name: {
        english: 'Ivanna Gradinar',
        ukrainian: 'Іванна Градинар',
      },
      position: {
        english: 'Financial Director',
        ukrainian: 'Фінансовий директор',
      },
    },
    {
      photo: 'mykolaSarazhynskyy.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/mykola.sarazhynskyy',
        },

        linkedin: {
          icon: 'linkedin',
          href: 'https://www.linkedin.com/in/mykolasarazhynskyy/',
        },
        email: {
          icon: 'email',
          href: 'mailto:mykola@protezfoundation.com',
        },
      },
      name: {
        english: 'Mykola Sarazhynskyy',
        ukrainian: 'Микола Саразинський',
      },
      position: {
        english: 'Director of Community Events',
        ukrainian: 'Директор з організації заходів для спільноти',
      },
    },
    {
      photo: 'tolyDzyuba.png',
      links: {
        linkedin: {
          icon: 'linkedin',
          href: 'https://www.linkedin.com/in/anatoliy-dzyuba-71880789/',
        },

        instagram: {
          icon: 'instagram',
          href: 'https://www.instagram.com/tolydzyuba/?hl=en',
        },
        email: {
          icon: 'email',
          href: 'mailto:toly@protezfoundation.com',
        },
      },
      name: {
        english: 'Toly Dzyuba',
        ukrainian: 'Толі Дзюба',
      },
      position: {
        english: 'Director of Events and Property Management',
        ukrainian: 'Керівник з організації заходів та управління',
      },
    },
    {
      photo: 'ruslanSychov.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/ruslan.sychov',
        },

        instagram: {
          icon: 'instagram',
          href: 'https://www.instagram.com/ruslan.sychov/',
        },

        linkedin: {
          icon: 'linkedin',
          href: 'https://www.linkedin.com/in/ruslan-sychov/',
        },
        email: {
          icon: 'email',
          href: 'mailto:ruslan@protezfoundation.com',
        },
      },

      name: {
        english: 'Ruslan Sychov',
        ukrainian: 'Руслан Сичов',
      },
      position: {
        english: 'Digital/IT Advisor',
        ukrainian: 'Digital / ІТ консультант',
      },
    },
    {
      photo: 'zhannaDzyuba.png',
      links: {},
      name: {
        english: 'Zhanna Dzyuba',
        ukrainian: 'Жанна Дзюба',
      },
      position: {
        english: 'Director of Events and Property Management',
        ukrainian: 'Керівник з організації заходів та управління',
      },
    },
    {
      photo: 'neliaSerianikova.png',
      links: {
        email: {
          icon: 'email',
          href: 'mailto:nelia@protezfoundation.com',
        },
      },
      name: {
        english: 'Nelia Serianikova ',
        ukrainian: 'Неля Серянікова',
      },
      position: {
        english: 'Food Services Manager',
        ukrainian: 'Food Services Manager',
      },
    },

    {
      photo: 'pavloKurynytskyi.png',
      links: {
        facebook: {
          icon: 'facebook',
          href: 'https://www.facebook.com/profile.php?id=100001740999825',
        },

        instagram: {
          icon: 'instagram',
          href: 'https://www.instagram.com/kurinitskii',
        },

        email: {
          icon: 'email',
          href: 'mailto:pavlo.kurynytskyi@protezfoundation.com',
        },
      },

      name: {
        english: 'Pavlo Kurynytskyi',
        ukrainian: 'Павло Куриницький',
      },
      position: {
        english: 'Church Relations Manager',
        ukrainian: 'Church Relations Manager',
      },
    },
  ],
}

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
  const { width } = useScreenModeAndSize()

  return (
    <TextAppearanceWrapper
      isDisabled={width < 600}
      className={`${style.memberCard} ${className && className}`}
    >
      <ProtezImage
        src={`protezPage/meetOurTeam/${photo}`}
        object-fit="contain"
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
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

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
      {width < 600 ? (
        <>
          {icons.meetOurTeamLogo.desktop[lang](style.teachersLogo)}

          <TextAppearanceWrapper>
            <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
              {meetOurTeamSection.members.map((card, index) => (
                <div key={index}>
                  <div className={style.cardWrapper}>
                    <MemberCard
                      className={style.teamCard}
                      photo={card.photo}
                      links={card.links}
                      name={card.name[lang]}
                      position={card.position[lang]}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </TextAppearanceWrapper>
          {/* <SeeAllButton href="/" className={style.discoverAllButton}>
            <span className={style.buttonText}>{meetOurTeamSection.discover[lang]}</span>
          </SeeAllButton> */}
        </>
      ) : (
        <>
          <div className={style.row}>
            <div className={style.titleCell}>
              {icons.meetOurTeamLogo.desktop[lang](style.teachersLogo)}
            </div>
            {meetOurTeamSection.members.slice(0, 2).map((card, index) => (
              <MemberCard
                key={index}
                className={style.teamCard}
                photo={card.photo}
                links={card.links}
                name={card.name[lang]}
                position={card.position[lang]}
              />
            ))}
          </div>
          <div className={style.row}>
            {meetOurTeamSection.members.slice(2, 11).map((card, index) => (
              <MemberCard
                key={index}
                className={style.teamCard}
                photo={card.photo}
                links={card.links}
                name={card.name[lang]}
                position={card.position[lang]}
              />
            ))}

            {/* <SeeAllButton href="/" className={style.discoverAllButton}>
              <span className={style.buttonText}> {meetOurTeamSection.discover[lang]}</span>
            </SeeAllButton> */}
          </div>
        </>
      )}
    </Section>
  )
}

export default MeetOurTeam
