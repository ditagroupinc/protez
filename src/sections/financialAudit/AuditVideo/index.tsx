'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import ProtezImage from '@/components/ProtezImage'
import { FinancialAuditIDs } from '@/consts'

import Reveal from '../_shared/Reveal'
import SplitHeading from '../_shared/SplitHeading'
import { icons } from './icons'
import style from './style.module.scss'

const VIDEO_ID = 'MFhCcbMO-YY'
const POSTER_SRC = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

const AuditVideo = () => {
  const t = useTranslations('financialAudit.video')
  const [playing, setPlaying] = useState(false)

  return (
    <section id={FinancialAuditIDs.Video} className={style.section}>
      <div className={style.inner}>
        <div className={style.head}>
          <SplitHeading as="h2" serif={t('titleSerif')} bold={t('titleBold')} />
          <p className={style.desc}>{t('description')}</p>
        </div>

        <Reveal className={style.frame}>
          {playing ? (
            <iframe
              className={style.player}
              src={EMBED_SRC}
              title={t('iframeTitle')}
              allow={IFRAME_ALLOW}
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={style.facade}
              aria-label={t('playAria')}
              onClick={() => setPlaying(true)}
            >
              <ProtezImage
                external
                src={POSTER_SRC}
                alt={t('posterAlt')}
                width={1280}
                height={720}
                sizes="(max-width: 900px) 100vw, 1100px"
                className={style.poster}
              />
              <span className={style.playButton} aria-hidden="true">
                {icons.play(style.playIcon)}
              </span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default AuditVideo
