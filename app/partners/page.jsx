'use client'

import AllOurPartners from '@/sections/AllOurPartners'
import Header from '@/sections/Header'
import Copyright from '@/components/Copyright'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import CompanyData from '@/components/CompanyData'
import SocialMediaLinks from '@/components/SocialMediaLinks'

export default function Partners() {
  const { desktop } = useScreenModeAndSize()

  return (
    <>
      <Header notMainPage />
      {desktop && <CompanyData black />}
      <SocialMediaLinks className={!desktop && 'hidden'} />
      <main>
        <AllOurPartners />
      </main>
      <footer>
        <Copyright />
      </footer>
    </>
  )
}
