import { useRef, useState } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { useHomeTexts } from '@/hooks/useHomeTexts'

import style from './style.module.scss'
import Slider from 'react-slick'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import Button from '@/components/Button'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

interface VeteranMeta {
  img: string
  icon: keyof typeof icons.titles
  spinIcon?: keyof typeof icons.spinIcons
  facebook: string
  instagram: string
  url: string
  videoLink: string
  linkedin: string
}

const veteransMeta: VeteranMeta[] = [
  {
    img: 'vadymFedorov.png',
    icon: 'vadymFedorov',
    spinIcon: 'vadymFedorovSpinIcon',
    facebook: 'https://www.facebook.com/donate/238890858497931/199310116131457/',
    instagram: 'https://www.instagram.com/reel/CqPla3pO_nT/?igshid=MzRlODBiNWFlZA==',
    url: 'VadymFedorov',
    videoLink:
      'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F3490463647948673%2F%3Fidorvanity%3D238890858497931&show_text=false&width=267&t=0',
    linkedin:
      'https://www.linkedin.com/posts/protez-foundation_vadym-fedorov-30-years-old-sergeant-vadym-activity-7045965954194784256-D_hH?utm_source=share&utm_medium=member_desktop',
  },
  {
    img: 'artemSvergun.png',
    icon: 'artemSvergun',
    spinIcon: 'artemSvergunSpinIcon',
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
    img: 'volodymyrKostyria.png',
    icon: 'volodymyrKostyria',
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
]

const Veterans = () => {
  const { lang } = useLanguage()
  const t = useHomeTexts().veterans
  const [iframeData, setIframeData] = useState({ opened: false, url: '' })
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  const veterans = t.items.map((item, index) => ({ ...item, ...veteransMeta[index] }))

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)
  const linksSliderRef = useRef<Slider & React.Component>(null)
  const wholeCardSliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    imageSliderRef.current?.slickNext()
    textSliderRef.current?.slickNext()
    linksSliderRef.current?.slickNext()
    wholeCardSliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    imageSliderRef.current?.slickPrev()
    textSliderRef.current?.slickPrev()
    linksSliderRef.current?.slickPrev()
    wholeCardSliderRef.current?.slickPrev()
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,

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
        {isDesktopLayout ? (
          <div className={style.card}>
            <div className={style.left}>
              <Slider ref={textSliderRef} {...settings}>
                {veterans.map((slide, index) => (
                  <div key={index}>
                    <div className={style.logoContainer}>
                      {icons.titles[slide.icon][lang](style.veteranLogo)}
                      <Body large={isDesktopLayout} className={style.ageRank}>
                        {slide.ageRank}
                      </Body>
                    </div>
                    <H3 className={style.cardTitle}>{slide.title}</H3>
                    <Body className={style.cardText} large={isDesktopLayout}>
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
                            <a target="blank" href={slide.linkedin as string}>
                              {icons.iconLinkedin(style.icon)}
                            </a>
                            <a target="blank" href={slide.facebook as string}>
                              {icons.iconFacebook(style.icon)}
                            </a>
                            <a target="blank" href={slide.instagram as string}>
                              {icons.iconInstagram(style.icon)}
                            </a>
                          </div>
                          <Button
                            as="link"
                            target="_blank"
                            href={slide.url}
                            variant="secondary-white"
                            size="normal"
                            className={style.Button}
                          >
                            {t.giveHope}
                          </Button>
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
                      <ProtezImage
                        src={`protezPage/veterans/${slide.img}`}
                        alt={slide.name + ' ' + slide.surname}
                        className={style.image}
                        width={1306}
                        height={1890}
                      />
                      {slide.spinIcon ? (
                        <button
                          className={style.roundButton}
                          onClick={() => {
                            setIframeData({ opened: true, url: slide.videoLink })
                          }}
                        >
                          {icons.spinIcons[slide.spinIcon](style.spinningName)}
                          {icons.triangle(style.triangle)}
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <>
            <Slider ref={wholeCardSliderRef} {...settings} className={style.wholeCardSlider}>
              {veterans.map((slide, index) => (
                <div key={index}>
                  <div className={style.card}>
                    <div className={style.right}>
                      <div className={style.imageSlideWrapper}>
                        <ProtezImage
                          src={`protezPage/veterans/${slide.img}`}
                          alt={slide.name + ' ' + slide.surname}
                          className={style.image}
                          width={1306}
                          height={1890}
                        />

                        {slide.spinIcon ? (
                          <button
                            className={style.roundButton}
                            onClick={() => {
                              setIframeData({ opened: true, url: slide.videoLink })
                            }}
                          >
                            {icons.spinIcons[slide.spinIcon](style.spinningName)}
                            {icons.triangle(style.triangle)}
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className={style.left}>
                      <div>
                        <div className={style.logoContainer}>
                          {icons.titles[slide.icon][lang](style.veteranLogo)}
                          <Body large={isDesktopLayout} className={style.ageRank}>
                            {slide.ageRank}
                          </Body>
                        </div>
                        <H3 className={style.cardTitle}>{slide.title}</H3>
                        <Body className={style.cardText} large={isDesktopLayout}>
                          {slide.text}
                        </Body>
                      </div>

                      <div className={style.linksSlide}>
                        <div className={style.iconsContainer}>
                          <a target="blank" href={slide.linkedin as string}>
                            {icons.iconLinkedin(style.icon)}
                          </a>
                          <a target="blank" href={slide.facebook as string}>
                            {icons.iconFacebook(style.icon)}
                          </a>
                          <a target="blank" href={slide.instagram as string}>
                            {icons.iconInstagram(style.icon)}
                          </a>
                        </div>
                        <Button
                          as="link"
                          target="_blank"
                          href={slide.url}
                          variant="secondary-white"
                          size="normal"
                          className={style.Button}
                        >
                          {t.giveHope}
                        </Button>
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
          </>
        )}
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
