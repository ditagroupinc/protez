'use client'
import { useContext } from 'react'

import Header from '@/sections/Header'
import Copyright from '@/components/Copyright'

import { ScreenModeAndSizeContext } from '@/contexts/ScreenModeAndSizeContext'

import SocialMediaLinks from '@/components/SocialMediaLinks'
export default function NotMainPage({ children }) {
  const { desktop } = useContext(ScreenModeAndSizeContext)

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
