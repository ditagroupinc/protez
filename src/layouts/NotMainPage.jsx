'use client'

import Header from '@/sections/Header'
import Copyright from '@/components/Copyright'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import SocialMediaLinks from '@/components/SocialMediaLinks'
export default function NotMainPage({ children }) {
  const { desktop } = useScreenModeAndSize()

  return (
    <>
      <Header notMainPage />
      <SocialMediaLinks className={!desktop && 'hidden'} />
      <main>{children}</main>
      <footer>
        <Copyright />
      </footer>
    </>
  )
}
