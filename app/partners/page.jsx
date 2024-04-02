'use client'
import { useContext } from 'react'
import AllOurPartners from '@/sections/AllOurPartners'
import Header from '@/sections/Header'
import Copyright from '@/components/Copyright'

import { ScreenModeAndSizeContext } from '@/contexts/ScreenModeAndSizeContext'

import CompanyData from '@/components/CompanyData'
import SocialMediaLinks from '@/components/SocialMediaLinks'

export default function Partners() {
  const { desktop } = useContext(ScreenModeAndSizeContext)

  return (
    <>
      <Header notMainPage />
      {desktop && <CompanyData black />}
      <SocialMediaLinks className={!desktop && 'hidden'} />
      <main>
        <AllOurPartners visible />
      </main>
      <footer>
        <Copyright />
      </footer>
    </>
  )
}
