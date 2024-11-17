'use client'

import style from './style.module.scss'
import Section from '@/components/Section'
import Footer from '@/sections/Footer'
import Header from '@/sections/Header'

export default function ArtemSvergun() {
  return (
    <>
      <Header layout="protezPage" ancorLinks={false} arrowUp={false} />
      <main>
        <Section className={style.section} id="donorBox">
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fposts%2Fpfbid02ABFsNzJ81L8tBotVsVVbDwhuoeGWLsrzjbq8WRhXBYS327eFWUskaHVGXHxe9KLtl&show_text=true&width=500"
            width="500"
            height="752"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className={style.iframe}
          />
        </Section>
      </main>
      <Footer layout="protezPage" />
    </>
  )
}
