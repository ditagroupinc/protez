'use client'

import { useTranslations } from 'next-intl'

import Section from '@/components/Section'
import ProtezImage from '@/components/ProtezImage'
import Button from '@/components/Button'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { ChildrenProstheticsIDs } from '@/consts'
import { useChildrensProstheticsTitle } from '@/hooks/useChildrensProstheticsTitle'

import style from './style.module.scss'

type StoryId = 'marijka' | 'oskar' | 'taya'
type StoryItem = {
  id: StoryId
  photo: string
  photoAlt: string
  meta: string
  paragraphs: string[]
  quote?: string
  cite?: string
}

const ChildrenStories = () => {
  const t = useTranslations('childrenProsthetics.stories')

  const items = t.raw('items') as StoryItem[]
  const badgeText = t('badgeText')
  const instaHref = t('instaHref')

  const storiesTitle = useChildrensProstheticsTitle('childrens-stories')
  const marijkaName = useChildrensProstheticsTitle('name-marijka')
  const oskarName = useChildrensProstheticsTitle('name-oskar')
  const tayaName = useChildrensProstheticsTitle('name-taya')

  const nameByStory: Record<StoryId, typeof marijkaName> = {
    marijka: marijkaName,
    oskar: oskarName,
    taya: tayaName,
  }

  return (
    <Section id={ChildrenProstheticsIDs.Stories} className={style.section}>
      <div className={style.inner}>
        <TextAppearanceWrapper className={style.head}>
          <ProtezImage
            src={storiesTitle.desktop.src}
            alt={storiesTitle.desktop.alt}
            width={storiesTitle.desktop.width}
            height={storiesTitle.desktop.height}
            className={style.title}
          />
          <p className={style.intro}>{t('intro')}</p>
        </TextAppearanceWrapper>

        {items.map((item, index) => {
          const [ledePara, ...restParas] = item.paragraphs
          const nameTitle = nameByStory[item.id]

          return (
            <TextAppearanceWrapper
              key={item.id}
              className={`${style.story} ${index % 2 === 1 ? style.storyFlip : ''}`}
            >
              <div>
                <ProtezImage
                  src={nameTitle.desktop.src}
                  alt={nameTitle.desktop.alt}
                  width={nameTitle.desktop.width}
                  height={nameTitle.desktop.height}
                  className={style.name}
                />
                <div className={style.meta}>{item.meta}</div>
                <div className={style.copy}>
                  <div className={style.lede}>
                    <div className={style.ledeBar} />
                    <p>{ledePara}</p>
                  </div>
                  {restParas.map((p, i) => (
                    <p key={i} className={style.para}>
                      {p}
                    </p>
                  ))}
                  {item.quote && (
                    <blockquote className={style.quote}>
                      {item.quote}
                      {item.cite && <cite className={style.cite}>{item.cite}</cite>}
                    </blockquote>
                  )}
                  <Button
                    as="link"
                    href="/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary-black"
                    size="normal"
                    className={style.cta}
                  >
                    {t('supportCta')}
                  </Button>
                </div>
              </div>

              <div className={style.media}>
                <div className={style.photo}>
                  <ProtezImage
                    src={`dytyacheProtezuvannyaPage/stories/${item.photo}`}
                    alt={item.photoAlt}
                    width={800}
                    height={1000}
                  />
                </div>
                <div className={style.badge}>
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <defs>
                      <path
                        id={`badge-path-${item.id}`}
                        d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      />
                    </defs>
                    <text fontSize="8" letterSpacing="2" fill="currentColor">
                      <textPath href={`#badge-path-${item.id}`}>{badgeText}</textPath>
                    </text>
                  </svg>
                  <div className={style.badgeCore}>♥</div>
                </div>
              </div>
            </TextAppearanceWrapper>
          )
        })}

        <div className={style.instaCta}>
          <a href={instaHref} target="_blank" rel="noopener noreferrer">
            {t('instaCta')}
          </a>
        </div>
      </div>
    </Section>
  )
}

export default ChildrenStories
