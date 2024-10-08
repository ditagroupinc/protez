import style from './style.module.css'
import { useState, forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { icons } from './icons'

import texts from '@/texts&svg'

import SubmitButton from './components/SubmitButton'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { FormStatus } from '@/types'

import { subscribeToMailchimp } from '@/lib/api'

const veteransImages = [
  '/veterans/mailingList/soldiers1.png',
  '/veterans/mailingList/soldiers2.png',
  '/veterans/mailingList/soldiers3.png',
  '/veterans/mailingList/soldiers4.png',
  '/veterans/mailingList/soldiers5.png',
  '/veterans/mailingList/soldiers6.png',
  '/veterans/mailingList/soldiers7.png',
  '/veterans/mailingList/soldiers8.png',
  '/veterans/mailingList/soldiers9.png',
  '/veterans/mailingList/soldiers10.png',
  '/veterans/mailingList/soldiers11.png',
  '/veterans/mailingList/soldiers12.png',
]

const MailingList = forwardRef(function (
  { inView }: { inView: boolean },
  ref: ForwardedRef<HTMLDivElement>
) {
  const { lang } = useLanguage()
  const [formStatus, setFormStatus] = useState<FormStatus>('default')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('isLoading')
    const target = event.target as typeof event.target & {
      email: { value: string }
    }
    const data = {
      email: target.email.value,
    }

    try {
      await subscribeToMailchimp(data)

      setFormStatus('sent')
      // await sendContactForm(data);
    } catch (error) {
      setFormStatus('error')
    }
  }

  return (
    <section className={style.section} id="mailingList" ref={ref}>
      <div className={style.images}>
        {veteransImages.map((path, i) => {
          return (
            <div key={i}>
              <Image
                src={path}
                alt="troops"
                width={2560}
                height={1440}
                className={`${style.image} ${inView && style.show}`}
              />
            </div>
          )
        })}
      </div>
      <div className={`${style.title} h6`}>
        <TextAppearanceWrapper>{icons.mailingListLogo[lang]('svgTextBlock')}</TextAppearanceWrapper>
        <TextAppearanceWrapper>
          <form className={`${style.form} h6 `} action="POST" onSubmit={handleSubmit}>
            <input
              className="p"
              placeholder={texts.mailingList.email[lang]}
              type="email"
              name="email"
              id="email"
              required
            />
            <SubmitButton text={texts.mailingList.subscribe[lang]} formStatus={formStatus} />
          </form>
        </TextAppearanceWrapper>
      </div>
    </section>
  )
})

MailingList.displayName = 'MailingList'
export default MailingList
