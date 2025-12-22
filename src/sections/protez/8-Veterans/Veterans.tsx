import { useRef, useState, useEffect } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import style from './style.module.scss'
import Slider from 'react-slick'

import { icons } from './icons'
import Section from '@/components/Section'
import { ProtezIDs } from '@/consts'
import { Body, H3 } from '@/components/Typography'
import Button from '@/components/Button'
import { BilingualText } from '@/types'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

interface Veteran {
  ageRank: BilingualText
  name: BilingualText
  surname: BilingualText
  title: BilingualText
  text: BilingualText
  img: string
  icon: keyof typeof icons.titles
  spinIcon?: keyof typeof icons.spinIcons
  video?: string
  facebook: string
  instagram: string
  url: string
  videoLink: string
  linkedin: string
}

interface VeteransSection {
  veterans: Veteran[]
  share: BilingualText
  giveHope: BilingualText
  videoButton: BilingualText
}

const veteransSection: VeteransSection = {
  veterans: [
    {
      ageRank: {
        english: '30 years old, sergeant.',
        ukrainian: '30 років, сержант.',
      },
      name: {
        english: 'Vadym',
        ukrainian: 'Вадим',
      },
      surname: {
        english: 'Fedorov',
        ukrainian: 'Федоров',
      },
      title: {
        english: 'Vadym has dedicated 10 years to the Ukrainian Army. ',
        ukrainian: 'Вадим присвятив 10 років Збройним Силам України.',
      },
      text: {
        english:
          'Defending Ukraine, he lost two legs with high amputations. Vadym is motivated and does not give up, he inspires everyone with his example. Vadym is currently in the USA undergoing prosthetics fitting and rehabilitation.  Only with your help we are able to fit Vadym with modern bionic prosthetics and return him to a full life. Together we are united and strong. Thank you for sharing this post and for your donations',
        ukrainian:
          'Захищаючи Україну, Вадим став обтяженним високими ампутаціями обох ніг. Але він продемонстрував мотивацію і відмову від здачі, ставши натхненням для всіх навколо своїм прикладом. Зараз Вадим перебуває в США, де проходить протезування та реабілітацію. Лише завдяки вашій підтримці ми зможемо оснастити Вадима сучасними біонічними протезами та повернути його до активного життя. Разом ми становимо сильну і єдину силу. Дякуємо вам за поширення цього повідомлення та ваші пожертви.',
      },
      img: 'vadymFedorov.png',
      icon: 'vadymFedorov',
      spinIcon: 'vadymFedorovSpinIcon',
      video: 'https://www.youtube.com/embed/D1zR9DkYgu4',
      facebook: 'https://www.facebook.com/donate/238890858497931/199310116131457/',
      instagram: 'https://www.instagram.com/reel/CqPla3pO_nT/?igshid=MzRlODBiNWFlZA==',
      url: 'VadymFedorov',
      videoLink:
        'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F3490463647948673%2F%3Fidorvanity%3D238890858497931&show_text=false&width=267&t=0',
      linkedin:
        'https://www.linkedin.com/posts/protez-foundation_vadym-fedorov-30-years-old-sergeant-vadym-activity-7045965954194784256-D_hH?utm_source=share&utm_medium=member_desktop',
    },
    {
      ageRank: {
        english: '16 years old, Mariupol.',
        ukrainian: '16 років, Маріуполь.',
      },
      name: {
        english: 'Artem',
        ukrainian: 'Артем',
      },
      surname: {
        english: 'Svergun',
        ukrainian: 'Свергун',
      },
      title: {
        english:
          'Artem played for the Mariupol youth soccer club, and he wanted to be a professional soccer player.',
        ukrainian:
          'Займався професійним футболом у складі команди Маріуполь юнацької збірної та мріяв присвятити своє життя футболу.',
      },
      text: {
        english: `Artem’s dream was to dedicate his life to soccer.  On March 2nd, 2022, he went to the local field to play a scrimmage match with his friends. While they were warming up, a Russian drone dropped a grenade on the field. Artem’s best friend Ilya, a boy of 15, was killed. Artem and another boy were severely injured. As a result of the injuries, Artem’s left leg was amputated above the knee, and his right leg is paralyzed. Artem’s dream is now to be able to walk again.`,
        ukrainian: `2 березня 2022 року пішов грати у футбол на стадіон разом із своїми друзями. У момент підготовки до гри до них кинули гранату з дрона. Найкращий друг Артема, Ілля, 15 років, загинув, а другий отримав поранення. Внаслідок травм ліву ногу Артему довелося ампутувати вище коліна, а права нога залишилася паралізованою. Єдина мрія Артема зараз - знову змогти ходити.`,
      },
      img: 'artemSvergun.png',
      icon: 'artemSvergun',
      spinIcon: 'artemSvergunSpinIcon',
      video: 'https://www.youtube.com/embed/D1zR9DkYgu4',
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
      ageRank: {
        english: '10 years old',
        ukrainian: '10 років',
      },
      name: {
        english: 'Volodymyr',
        ukrainian: 'Володимир',
      },
      surname: {
        english: 'Kostyria',
        ukrainian: 'Костиря',
      },
      title: {
        english: 'His dream is to run, jump and play football...',
        ukrainian: 'Його мрія — бігати, стрибати і грати у футбол...',
      },
      text: {
        english: `Volodya, a 10-year-old boy from the Dnipropetrovsk region, was born with atrophied lower limbs and spent years moving on his hands and knees. After the amputation of both lower limbs, he traveled to Minneapolis with the support of the Protez Foundation and took his first steps on training prosthetics. His determination and joy were incredible, as he was able to walk proudly for the first time in his life.`,
        ukrainian: `Володя, 10-річний хлопчик із Дніпропетровської області, народився з атрофованими нижніми кінцівками й багато років пересувався на руках та колінах. Після ампутації обох нижніх кінцівок він вирушив до Міннеаполіса за підтримки Protez Foundation і зробив там свої перші кроки на тренувальних протезах. Його рішучість і радість були неймовірними, адже вперше в житті він зміг гордо ходити.`,
      },
      img: 'volodymyrKostyria.png',
      icon: 'volodymyrKostyria',
      // spinIcon:
      // video: 'https://www.youtube.com/embed/D1zR9DkYgu4',
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
  ],
  share: {
    english: 'Share me',
    ukrainian: 'Поділитися',
  },

  giveHope: {
    english: 'Give Hope!',
    ukrainian: 'Дати Надію!',
  },

  videoButton: {
    english: 'get better known',
    ukrainian: ' get better known ',
  },
}

const Veterans = () => {
  const { lang } = useLanguage()
  const [iframeData, setIframeData] = useState({ opened: false, url: '' })
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const textSliderRef = useRef<Slider & React.Component>(null)
  const linksSliderRef = useRef<Slider & React.Component>(null)
  const wholeCardSliderRef = useRef<Slider & React.Component>(null)

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      gotoNext()
    }, 5000)

    return () => clearInterval(autoplayInterval)
  }, [isDesktopLayout])

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
    autoplay: false, // Вимкнено - використовуємо власний таймер
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
                {veteransSection.veterans.map((slide, index) => (
                  <div key={index}>
                    <div className={style.logoContainer}>
                      {icons.titles[slide.icon as keyof typeof icons.titles][lang](
                        style.veteranLogo
                      )}
                      <Body large={isDesktopLayout} className={style.ageRank}>
                        {slide.ageRank[lang]}
                      </Body>
                    </div>
                    <H3 className={style.cardTitle}>{slide.title[lang]}</H3>
                    <Body className={style.cardText} large={isDesktopLayout}>
                      {slide.text[lang]}
                    </Body>
                  </div>
                ))}
              </Slider>
              <div className={style.buttonsContainer}>
                <div className={style.linksSliderWrapper}>
                  <Slider ref={linksSliderRef} {...settings}>
                    {veteransSection.veterans.map((slide, index) => (
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
                            {veteransSection.giveHope[lang]}
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
                {veteransSection.veterans.map((slide, index) => (
                  <div key={index}>
                    <div className={style.imageSlideWrapper}>
                      <ProtezImage
                        src={`protezPage/veterans/${slide.img}`}
                        alt={slide.name[lang] + ' ' + slide.surname[lang]}
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
              {veteransSection.veterans.map((slide, index) => (
                <div key={index}>
                  <div className={style.card}>
                    <div className={style.right}>
                      <div className={style.imageSlideWrapper}>
                        <ProtezImage
                          src={`protezPage/veterans/${slide.img}`}
                          alt={slide.name[lang] + ' ' + slide.surname[lang]}
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
                          {icons.titles[slide.icon as keyof typeof icons.titles][lang](
                            style.veteranLogo
                          )}
                          <Body large={isDesktopLayout} className={style.ageRank}>
                            {slide.ageRank[lang]}
                          </Body>
                        </div>
                        <H3 className={style.cardTitle}>{slide.title[lang]}</H3>
                        <Body className={style.cardText} large={isDesktopLayout}>
                          {slide.text[lang]}
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
                          {veteransSection.giveHope[lang]}
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
            // frameborder="0"
            // allowfullscreen="true"
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
