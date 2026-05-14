import style from './socialMediaLinks.module.css'

import { socialLinks } from './icons'

export default function SocialMediaLinks({ className = '', color = 'pink' }) {
  return (
    <div className={`${style.container} ${className}`}>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.address}
          className={`${style.link} ${style[color]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon(style.icon)}
        </a>
      ))}
    </div>
  )
}
