import { useLanguage } from '@/contexts/LanguageContext'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '@/consts'
import { Body } from '@/components/Typography'

import Slider from 'react-slick'
import { useRef, useState } from 'react'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

const peopleTrustUsText = {
  cards: [
    {
      image: 'peopleTrustUsSlide1.png',
      description: {
        ukrainian:
          'Підписано меморандум про продовження співпраці між Protez Foundation та Міністерством охорони здоров’я України. Наша мета — єдність задля підтримки та допомоги нашим героям, які заслуговують на найкраще. Разом ми зможемо досягти значних змін у сфері реабілітації та забезпечення якісними протезами.',
        english:
          'A memorandum on the continuation of cooperation between the Protez Foundation and the Ministry of Health of Ukraine has been signed. Our goal is unity in support and assistance to our heroes who deserve the best. Together we can achieve significant changes in the field of rehabilitation and provision of quality prosthetics.',
      },
    },
    {
      image: 'peopleTrustUsSlide2.png',
      description: {
        ukrainian:
          'Співпраця та єдність – це ключ до успіху в нашому спільному бажанні забезпечити протезування та реабілітацію наших героїв на високому рівні. Ми продовжили меморандум про співпрацю з Міністерством внутрішніх справ України та успішно реалізуємо спільні проєкти з навчання фахівців і протезування військових.',
        english:
          'Collaboration and unity are the key to success in our common desire to provide prosthetics and rehabilitation of our heroes at a high level. We have extended the memorandum of cooperation with the Ministry of Internal Affairs of Ukraine and successfully implement joint projects for training specialists and prosthetics for military personnel.',
      },
    },
    {
      image: 'peopleTrustUsSlide3.png',
      description: {
        ukrainian:
          'Величезна подяка легендарному генералу Валерію Залужному за героїзм і мужність у перші роки війни.',
        english:
          'A huge thank you to the legendary General Valerii Zaluzhnyi for his heroism and courage in the first years of the war.',
      },
    },
    {
      image: 'peopleTrustUsSlide4.png',
      description: {
        ukrainian:
          'Direct Relief – наш надійний партнер, який надихає нас своєю місією допомагати людям у всьому світі. Їхня підтримка в досягненні цілей Фонду Протез в Україні є неоціненною.',
        english:
          'Direct Relief – our reliable partner who inspires us with their mission to help people around the world. Their support in achieving the goals of the Prosthetics Foundation in Ukraine is invaluable.',
      },
    },
  ],
}

const PeopleTrustUs = () => {
  const { lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const { width } = useScreenModeAndSize()
  const showTopNavigation = width < 1180 && width > 800
  const isDesktopLayout = width > 800

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,

    arrows: false,

    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,

    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          centerMode: true,
          centerPadding: '80px',
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          draggable: true,
          accessibility: true,

          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1,
          dots: true,
        },
      },
    ],

    beforeChange: (_current: number, next: number) => setActiveSlide(next),
  }

  const imageSliderRef = useRef<Slider & React.Component>(null)
  const sliderRef = useRef<Slider & React.Component>(null)

  const gotoNext = () => {
    imageSliderRef.current?.slickNext()
    sliderRef.current?.slickNext()
  }
  const gotoPrev = () => {
    imageSliderRef.current?.slickPrev()
    sliderRef.current?.slickPrev()
  }

  return (
    <Section id={ProtezIDs.PeopleTrustUs} className={style.section}>
      <div className={style.container}>
        {width > 1180 && (
          <div className={style.left}>
            <Slider {...settings} ref={imageSliderRef} className={style.imageSlider}>
              {peopleTrustUsText.cards.map((card, index) => (
                <div className={style.imageWrapper} key={index}>
                  <ProtezImage
                    width={984}
                    height={540}
                    src={`protezPage/peopleTrustUs/${card.image}`}
                    alt={card.description[lang]}
                    className={style.image}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className={style.right}>
          <div className={style.titleContainer}>
            {icons.peopleTrustUsLogo.desktop[lang](style.title)}
            {showTopNavigation && (
              <div className={style.sliderNavigation}>
                <button className={style.sliderButton} onClick={gotoPrev}>
                  {icons.arrowLeft(style.arrow)}
                </button>
                <button className={style.sliderButton} onClick={gotoNext}>
                  {icons.arrowRight(style.arrow)}
                </button>
              </div>
            )}
          </div>
          <div>
            <Slider {...settings} ref={sliderRef} className={style.slickSlider}>
              {peopleTrustUsText.cards.map((card, index) => {
                let slideClass = ''

                switch (index) {
                  case activeSlide:
                    slideClass = style.leftSlide
                    break
                  case (activeSlide + 1) % peopleTrustUsText.cards.length:
                    slideClass = style.centerSlide
                    break
                  case (activeSlide + 2) % peopleTrustUsText.cards.length:
                    slideClass = style.rightSlide
                    break
                  default:
                    slideClass = ''
                }

                return (
                  <div key={index}>
                    <Body large className={style.textSlide}>
                      {card.description[lang]}
                    </Body>
                    <div className={`${style.cardWrapper} ${slideClass}`}>
                      <div className={`${style.card} `}>
                        <ProtezImage
                          width={984}
                          height={540}
                          src={`protezPage/peopleTrustUs/${card.image}`}
                          alt={card.description[lang]}
                          className={style.image}
                        />
                        <Body large={isDesktopLayout} className={style.text}>
                          {card.description[lang]}
                        </Body>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
          <TextAppearanceWrapper className={style.buttonsContainer}>
            {!showTopNavigation && (
              <div className={style.sliderNavigation}>
                <button className={style.sliderButton} onClick={gotoPrev}>
                  {icons.arrowLeft(style.arrow)}
                </button>
                <button className={style.sliderButton} onClick={gotoNext}>
                  {icons.arrowRight(style.arrow)}
                </button>
              </div>
            )}

            {/* <Button
              as="link"
              href="/"
              variant="secondary-white"
              size="normal"
              arrow
              className={style.latestNewsButton}
            >
              {peopleTrustUsText.latestNews[lang]}
            </Button> */}
          </TextAppearanceWrapper>
        </div>
      </div>
    </Section>
  )
}

export default PeopleTrustUs
