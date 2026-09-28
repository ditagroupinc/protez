'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'

import style from './style.module.scss'
import Slider from '@/islands/SlickCarousel'

import { icons } from './icons'
import StoryVideoButton from './StoryVideoButton'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import SectionTitle from '@/components/SectionTitle'
import vadymPhoto from '../../../../public/protezPage/veterans/vadymFedorov.png'
import artemPhoto from '../../../../public/protezPage/veterans/artemSvergun.png'
import volodymyrPhoto from '../../../../public/protezPage/veterans/volodymyrKostyria.png'
import oleksandrPhoto from '../../../../public/protezPage/veterans/oleksandr.png'
import tetianaPhoto from '../../../../public/protezPage/veterans/tetiana.png'

interface VeteranMeta {
  img: StaticImageData
  facebook: string
  instagram: string
  url?: string
  videoLink?: string
  linkedin?: string
}

type VeteranItem = {
  name: string
  surname: string
  title: string
  text: string
}

const veteransMeta: VeteranMeta[] = [
  {
    img: vadymPhoto,
    facebook: 'https://www.facebook.com/donate/238890858497931/199310116131457/',
    instagram: 'https://www.instagram.com/reel/CqPla3pO_nT/?igshid=MzRlODBiNWFlZA==',
    url: 'VadymFedorov',
    videoLink:
      'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F3490463647948673%2F%3Fidorvanity%3D238890858497931&show_text=false&width=267&t=0',
    linkedin:
      'https://www.linkedin.com/posts/protez-foundation_vadym-fedorov-30-years-old-sergeant-vadym-activity-7045965954194784256-D_hH?utm_source=share&utm_medium=member_desktop',
  },
  {
    img: artemPhoto,
    facebook:
      'https://www.facebook.com/prostheticsforukrainians/posts/pfbid02ABFsNzJ81L8tBotVsVVbDwhuoeGWLsrzjbq8WRhXBYS327eFWUskaHVGXHxe9KLtl',
    instagram:
      'https://www.instagram.com/p/CuGu1bEuIaf/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA%3D%3D=',
    url: 'ArtemSvergun',
    videoLink:
      'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F778775984044964%2F&show_text=false&width=267&t=0',
    linkedin:
      'https://www.linkedin.com/posts/protez-foundation_our-young-hero-artem-16-years-old-activity-7086077525998583808-kZBW/?utm_source=share&utm_medium=member_ios',
  },
  {
    img: volodymyrPhoto,
    facebook:
      'https://www.facebook.com/prostheticsforukrainians/posts/pfbid02ABFsNzJ81L8tBotVsVVbDwhuoeGWLsrzjbq8WRhXBYS327eFWUskaHVGXHxe9KLtl',
    instagram:
      'https://www.instagram.com/p/CuGu1bEuIaf/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA%3D%3D=',
    url: 'volodymyrKostyria',
    videoLink:
      'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F778775984044964%2F&show_text=false&width=267&t=0',
    linkedin:
      'https://www.linkedin.com/posts/protez-foundation_our-young-hero-artem-16-years-old-activity-7086077525998583808-kZBW/?utm_source=share&utm_medium=member_ios',
  },
  {
    img: oleksandrPhoto,
    facebook:
      'https://www.facebook.com/prostheticsforukrainians/videos/%D0%BF%D0%BE%D0%B2%D0%B5%D1%80%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F-%D0%B4%D0%BE-%D1%81%D0%BB%D1%83%D0%B6%D0%B1%D0%B8-%D1%82%D0%B0-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83-%D1%96%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%8F-%D0%BF%D0%B0%D1%86%D1%96%D1%94%D0%BD%D1%82%D0%B0-%D0%BE%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%B0-%D1%83-%D0%BD%D0%BE%D0%B2%D0%BE%D0%BC%D1%83-%D0%B2%D0%B8%D0%BF%D1%83%D1%81%D0%BA%D1%83-prot/1047260684682761/',
    instagram: 'https://www.instagram.com/p/Dcs_jlkIrDj/',
    linkedin:
      'https://www.linkedin.com/feed/update/urn:li:ugcPost:7506283500161994752/?actorCompanyId=89729204',
    videoLink:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F1047260684682761%2F',
  },
  {
    img: tetianaPhoto,
    facebook: 'https://www.facebook.com/prostheticsforukrainians/videos/2103728430177196/',
    instagram: 'https://www.instagram.com/p/Daz9OPHI01W/',
    videoLink:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F2103728430177196%2F',
  },
]

const Veterans = () => {
  const t = useTranslations('home.veterans')
  const items = t.raw('items') as VeteranItem[]
  const [iframeData, setIframeData] = useState({ opened: false, url: '' })

  const openVideo = (url?: string) => {
    if (url) setIframeData({ opened: true, url })
  }

  const veterans = items.map((item, index) => ({ ...item, ...veteransMeta[index] }))

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)
  const linksSliderRef = useRef<Slider & React.Component>(null)
  const wholeCardSliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    wholeCardSliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    wholeCardSliderRef.current?.slickPrev()
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    // autoplaySpeed: 5000,
    waitForAnimate: false,

    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,
        },
      },
    ],
  }

  return (
    <>
      <Section id={ProtezIDs.Veterans} className={style.section}>
        <div className={`${style.card} ${style.desktopCard}`}>
          <div className={style.left}>
            <Slider ref={textSliderRef} {...settings}>
              {veterans.map((slide, index) => (
                <div key={index}>
                  <div className={style.logoContainer}>
                    <SectionTitle className={style.title}>
                      <span className={style.titleLine}>{slide.name}</span>
                      {slide.surname && (
                        <>
                          {' '}
                          <span className={style.titleLine}>{slide.surname}</span>
                        </>
                      )}
                    </SectionTitle>
                  </div>
                  <H3 className={style.cardTitle}>{slide.title}</H3>
                  <Body className={style.cardText} large>
                    {slide.text}
                  </Body>
                </div>
              ))}
            </Slider>
            <div className={style.buttonsContainer}>
              <div className={style.linksSliderWrapper}>
                <Slider ref={linksSliderRef} {...settings}>
                  {veterans.map((slide, index) => (
                    <div key={index}>
                      <div className={style.linksSlide}>
                        <div className={style.iconsContainer}>
                          {slide.linkedin && (
                            <a target="blank" href={slide.linkedin as string}>
                              {icons.iconLinkedin(style.icon)}
                            </a>
                          )}
                          <a target="blank" href={slide.facebook as string}>
                            {icons.iconFacebook(style.icon)}
                          </a>
                          <a target="blank" href={slide.instagram as string}>
                            {icons.iconInstagram(style.icon)}
                          </a>
                        </div>
                        {/* <Button
                          as="link"
                          target="_blank"
                          href={slide.url}
                          variant="secondary-white"
                          size="normal"
                          className={style.Button}
                        >
                          {t('giveHope')}
                        </Button> */}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className={style.sliderNavigation}>
                <button className={style.sliderButton} onClick={gotoPrev}>
                  {icons.arrowLeft(style.arrow)}
                </button>
                <button className={style.sliderButton} onClick={gotoNext}>
                  {icons.arrowRight(style.arrow)}
                </button>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <Slider ref={imageSliderRef} {...settings} className={style.imagesSlider}>
              {veterans.map((slide, index) => (
                <div key={index}>
                  <div className={style.imageSlideWrapper}>
                    <Image
                      src={slide.img}
                      alt={slide.name + ' ' + slide.surname}
                      className={style.image}
                    />
                    {slide.videoLink && (
                      <StoryVideoButton
                        label={t('videoButton', { name: slide.name })}
                        onClick={() => openVideo(slide.videoLink)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className={style.mobileWrapper}>
          <Slider
            ref={wholeCardSliderRef}
            {...settings}
            waitForAnimate
            beforeChange={(_current, next) => {
              imageSliderRef.current?.slickGoTo(next)
              textSliderRef.current?.slickGoTo(next)
              linksSliderRef.current?.slickGoTo(next)
            }}
            className={style.wholeCardSlider}
          >
            {veterans.map((slide, index) => (
              <div key={index}>
                <div className={style.card}>
                  <div className={style.right}>
                    <div className={style.imageSlideWrapper}>
                      <Image
                        src={slide.img}
                        alt={slide.name + ' ' + slide.surname}
                        className={style.image}
                      />

                      {slide.videoLink && (
                        <StoryVideoButton
                          label={t('videoButton', { name: slide.name })}
                          onClick={() => openVideo(slide.videoLink)}
                        />
                      )}
                    </div>
                  </div>
                  <div className={style.left}>
                    <div>
                      <div className={style.logoContainer}>
                        <SectionTitle className={style.title}>
                          <span className={style.titleLine}>{slide.name}</span>
                          {slide.surname && (
                            <>
                              {' '}
                              <span className={style.titleLine}>{slide.surname}</span>
                            </>
                          )}
                        </SectionTitle>
                      </div>
                      <H3 className={style.cardTitle}>{slide.title}</H3>
                      <Body className={style.cardText}>{slide.text}</Body>
                    </div>

                    <div className={style.linksSlide}>
                      <div className={style.iconsContainer}>
                        {slide.linkedin && (
                          <a target="blank" href={slide.linkedin as string}>
                            {icons.iconLinkedin(style.icon)}
                          </a>
                        )}
                        <a target="blank" href={slide.facebook as string}>
                          {icons.iconFacebook(style.icon)}
                        </a>
                        <a target="blank" href={slide.instagram as string}>
                          {icons.iconInstagram(style.icon)}
                        </a>
                      </div>
                      {/* <Button
                        as="link"
                        target="_blank"
                        href={slide.url}
                        variant="secondary-white"
                        size="normal"
                        className={style.Button}
                      >
                        {t('giveHope')}
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className={style.sliderNavigation}>
            <button className={style.sliderButton} onClick={gotoPrev}>
              {icons.arrowLeft(style.arrow)}
            </button>
            <button className={style.sliderButton} onClick={gotoNext}>
              {icons.arrowRight(style.arrow)}
            </button>
          </div>
        </div>
      </Section>
      {iframeData.opened && (
        <>
          <div className={style.mask} onClick={() => setIframeData({ opened: false, url: '' })} />
          <iframe
            className={style.iFrame}
            src={iframeData.url}
            width="400"
            height="713"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={true}
          />
          <button
            className={style.closeVideo}
            onClick={() => setIframeData({ opened: false, url: '' })}
          >
            {icons.closeVideo()}
          </button>
        </>
      )}
    </>
  )
}

export default Veterans
