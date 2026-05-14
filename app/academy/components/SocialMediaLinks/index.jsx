import style from './socialMediaLinks.module.css'

import texts from '@academy/components/texts-svg'

export default function SocialMediaLinks({ className = '', color = 'pink' }) {
  return (
    <div className={`${style.container} ${className}`}>
      {texts.socialMediaLinks.map((link, index) => (
        <a
          key={index}
          href={link.address}
          className={`${style.link} ${style[color]}`}
          target="blank"
        >
          {link.icon(style.icon)}
        </a>
      ))}
    </div>
  )
}
