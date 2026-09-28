import { useEffect, useRef, type MouseEvent } from 'react'
import { useTranslations } from 'next-intl'

import { HOME_PHONE, HOME_PHONE_TEL } from './config'
import { icons } from './icons'
import style from './style.module.scss'

const messengers = [
  { name: 'Telegram', href: 'https://t.me/+380955222401', icon: icons.telegram },
  { name: 'WhatsApp', href: 'https://wa.me/380955222401', icon: icons.whatsapp },
  { name: 'Viber', href: 'viber://chat?number=%2B380955222401', icon: icons.viber },
]

const PhoneContacts = () => {
  const t = useTranslations('shared.header.phoneContacts')
  const animationRef = useRef<Animation | null>(null)
  const expandedRef = useRef(false)

  useEffect(() => () => animationRef.current?.cancel(), [])

  const toggleContacts = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const summary = event.currentTarget
    const dropdown = summary.parentElement as HTMLDetailsElement
    const startHeight = dropdown.getBoundingClientRect().height
    const expanded = !expandedRef.current

    expandedRef.current = expanded
    dropdown.dataset.expanded = String(expanded)
    animationRef.current?.cancel()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dropdown.open = expanded
      dropdown.style.overflow = ''
      animationRef.current = null

      return
    }

    dropdown.open = true
    const endHeight = expanded ? dropdown.scrollHeight : summary.offsetHeight

    dropdown.style.overflow = 'hidden'
    const animation = dropdown.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 300, easing: 'ease-in-out', fill: 'both' }
    )

    animationRef.current = animation
    animation.onfinish = () => {
      dropdown.open = expanded
      animation.cancel()
      dropdown.style.overflow = ''
      animationRef.current = null
    }
  }

  return (
    <details className={style.contactDropdown}>
      <summary className={style.contactSummary} onClick={toggleContacts}>
        <span aria-hidden="true">{icons.call(style.icon)}</span>
        {t('title')}
      </summary>
      <ul className={style.phoneContacts}>
        <li>
          <a className={style.contactNumber} href={HOME_PHONE_TEL}>
            {HOME_PHONE}
          </a>
          <p className={style.contactDescription}>{t('usa')}</p>
        </li>
        <li>
          <a className={style.contactNumber} href="tel:+380443344001">
            +38 044 334 40 01
          </a>
          <p className={style.contactDescription}>{t('ukraine')}</p>
        </li>
        <li>
          <div className={style.messengerLinks}>
            {messengers.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                className={`${style.socialMediaLink} ${style.messengerLink}`}
                aria-label={name}
                title={name}
                target={href.startsWith('https:') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {icon(style.socialMediaLinkIcon)}
              </a>
            ))}
          </div>
        </li>
      </ul>
    </details>
  )
}

export default PhoneContacts
