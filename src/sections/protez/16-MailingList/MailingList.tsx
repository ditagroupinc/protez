import style from './style.module.scss'
import { useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { icons } from './icons'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { subscribeToMailchimp } from '@/lib/api'
import { ProtezIDs } from '@/consts'
// import { mailOptions } from '../../../config/nodemailer'
import Button from '@/components/Button'
// import { Body } from '@/components/Typography'
import Section from '@/components/Section'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useInView } from 'framer-motion'
import ProtezImage from '@/components/ProtezImage'

const mailingListSection = {
  submitButton: {
    default: {
      english: 'Subscribe!',
      ukrainian: 'Підписатись!',
    },
    loading: {
      english: 'Loading...',
      ukrainian: 'Завантаження...',
    },
    sent: {
      english: 'Sent!',
      ukrainian: 'Відправлено!',
    },
    error: {
      english: 'Error!',
      ukrainian: 'Помилка!',
    },
  },

  email: {
    english: 'Your email*',
    ukrainian: 'Твій імейл*',
  },
  phoneNumber: {
    english: 'Phone number',
    ukrainian: 'Номер телефону',
  },
  address: {
    english: 'Address',
    ukrainian: 'Адреса',
  },
  addYourAddress: {
    english: 'Add your address',
    ukrainian: 'Додати вашу адресу',
  },
  addYourAddressTo: {
    english: 'Add your address to receive ...',
    ukrainian: 'Add your address to receive ...',
  },
}

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
  const { lang } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [formStatus, setFormStatus] = useState<FormStatus>('default')
  // const [showAddress, setShowAddress] = useState(true)

  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('loading')
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
    <Section className={style.section} id={ProtezIDs.MailingList} ref={ref}>
      <div className={`${style.images} ${isInView ? style.show : ''}`}>
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
        {isDesktopLayout
          ? icons.mailingListLogo.desktop[lang](style.title)
          : icons.mailingListLogo.mobile[lang](style.title)}

        <form className={style.form} action="POST" onSubmit={handleSubmit}>
          <input
            className={style.input}
            placeholder={mailingListSection.email[lang]}
            type="email"
            name="email"
            id="email"
            required
          />
          <input
            className={style.input}
            placeholder={mailingListSection.phoneNumber[lang]}
            type="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
          />
          {/* {showAddress && (
            <input
              className={style.input}
              placeholder={mailingListSection.address[lang]}
              type="address"
              name="address"
              id="address"
            />
          )} */}
          {/* <Body large>{mailingListSection.addYourAddressTo[lang]}</Body> */}
          {/* <Button
            variant="secondary-white"
            as="button"
            className={style.addAdressButton}
            type="button"
          >
            {icons.plus()} {mailingListSection.addYourAddress[lang]}
          </Button> */}
          <Button
            variant="primary-red"
            as="button"
            className={`${style.submitButton} ${style[formStatus]}`}
            type="submit"
            size="normal"
          >
            {mailingListSection.submitButton[formStatus][lang]}

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
