import { forwardRef, useRef } from 'react'

import Image from 'next/image'

import Slider from 'react-slick'

import AcademySection from '@/components/AcademySection'

import style from './style.module.scss'

import { AcademyIDs } from '../../consts'
import { icons } from './icons'
import Button from '@/components/Button'

const cards = [
  {
    icon: 'support-ukraine.svg',
    title: 'Людиноцентричність',
    text: 'Пацієнт — у центрі всіх рішень. Ми працюємо не з діагнозом, а з людиною, її цілями, функцією та якістю життя.',
  },
  {
    icon: 'professional-excellence.svg',
    title: 'Якість і професійність',
    text: 'Ми навчаємо сучасним, доказовим і клінічно релевантним підходам, які дають реальний результат у практиці.',
  },
  {
    icon: 'practical-experience.svg',
    title: 'Практичність',
    text: 'Освіта має формувати навички. Ми фокусуємось на тому, що можна застосувати одразу в роботі з пацієнтом.',
  },
  {
    icon: 'global-development.svg',
    title: 'Постійний розвиток',
    text: 'Ми постійно розвиваємося, впроваджуючи нові підходи та технології у свою практику.',
  },
  {
    icon: 'innovation.svg',
    title: 'Інноваційність',
    text: 'Ми шукаємо, тестуємо та впроваджуємо нові технології, рішення і формати навчання у протезуванні та реабілітації.',
  },
]

const MissionAndValues = forwardRef<HTMLDivElement>(function (_, ref) {
  // const sliderRef = useRef<Slider & React.Component>(null)

  // const settings = {
  //   dots: false,
  //   arrows: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   responsive: [
  //     { breakpoint: 1366, settings: { slidesToShow: 4 } },
  //     { breakpoint: 1024, settings: { slidesToShow: 3 } },
  //     { breakpoint: 768, settings: { slidesToShow: 2 } },
  //     { breakpoint: 600, settings: { slidesToShow: 1 } },
  //   ],
  // }

  return (
    <AcademySection ref={ref} id={AcademyIDs.MissionAndValues} className={style.academyGoals}>
      <div className={style.container}>
        <div className={style.right}>
          {icons.missionAndValuesLogo.desktop(style.title)}
          <p className={style.description}>
            Місія: Розвивати систему протезування та реабілітації в Україні через сучасну освіту,
            інтеграцію міжнародного досвіду та практичних рішень, щоб кожна людина після ампутації
            мала доступ до якісного, функціонального та людиноцентричного відновлення.
          </p>
          <Button
            as="link"
            href="/donate"
            variant="normal-black"
            size="big"
            className={style.button}
          >
            Про Academy
            {icons.arrowUp(`${style.arrowUpIcon}`)}
          </Button>
        </div>

        <div className={style.left}>
          <Image
            src="/protez/academyPage/mission-and-values.png"
            alt="Mission and values"
            width={720}
            height={520}
            className={style.image}
          />
        </div>
      </div>

      <div className={style.cardsContainer}>
        {cards.map((item, index) => (
          <div key={index} className={style.card}>
            <Image
              src={`/protez/academyPage/icons/${item.icon}`}
              alt={item.icon}
              width={48}
              height={48}
              className={style.icon}
            />
            <div className={style.cardContent}>
              <p className={style.cardTitle}>{item.title}</p>
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  MissionAndValues.displayName = 'MissionAndValues'
}

export default MissionAndValues
