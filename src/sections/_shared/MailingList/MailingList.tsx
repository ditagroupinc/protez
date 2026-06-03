'use client'

import style from './style.module.scss'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { localeToLanguage } from '@/lib/locale'
import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { subscribeToMailchimp } from '@/lib/api'
import { ProtezIDs } from '@/consts'
import Button from '@/components/Button'
import Section from '@/components/Section'
import { useInView } from 'react-intersection-observer'
import ProtezImage from '@/components/ProtezImage'

const veteransImages = [
  'soldiers1.png',
  'soldiers2.png',
  'soldiers3.png',
  'soldiers4.png',
  'soldiers5.png',
  'soldiers6.png',
  'soldiers7.png',
  'soldiers8.png',
  'soldiers9.png',
  'soldiers10.png',
  'soldiers11.png',
  'soldiers12.png',
]

type FormStatus = 'loading' | 'error' | 'sent' | 'default'

const MailingList = () => {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('shared.mailingList')

  const { ref, inView } = useInView({ triggerOnce: true })

  const [formStatus, setFormStatus] = useState<FormStatus>('default')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('loading')
    const target = event.target as typeof event.target & {
      email: { value: string }
    }
    const data = {
      email: target.email.value,
      locale,
    }

    try {
      await subscribeToMailchimp(data)

      setFormStatus('sent')
    } catch (error) {
      setFormStatus('error')
    }
  }

  return (
    <Section className={style.section} id={ProtezIDs.MailingList} ref={ref}>
      <div className={`${style.images} ${inView ? style.show : ''}`}>
        {veteransImages.map((slide, index) => {
          return (
            <div key={index} className={style.imageWrapper}>
              <ProtezImage
                src={`protezPage/mailingList/${slide}`}
                alt="troops"
                width={331}
                height={316}
                className={style.image}
              />
            </div>
          )
        })}
      </div>
      <TextAppearanceWrapper className={style.container}>
        {icons.mailingListLogo.desktop[lang](`${style.title} ${style.titleDesktop}`)}
        {icons.mailingListLogo.mobile[lang](`${style.title} ${style.titleMobile}`)}

        <form className={style.form} action="POST" onSubmit={handleSubmit}>
          <input
            className={style.input}
            placeholder={t('email')}
            type="email"
            name="email"
            id="email"
            required
          />
          <input
            className={style.input}
            placeholder={t('phoneNumber')}
            type="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
          />
          <Button
            variant="primary-red"
            as="button"
            className={`${style.submitButton} ${style[formStatus]}`}
            type="submit"
            size="normal"
          >
            {t(`submitButton.${formStatus}`)}

            {formStatus === 'loading' && (
              <ProtezImage src={'spinner.gif'} alt="spinner" width={24} height={24} />
            )}
          </Button>
        </form>
      </TextAppearanceWrapper>
    </Section>
  )
}

export default MailingList
