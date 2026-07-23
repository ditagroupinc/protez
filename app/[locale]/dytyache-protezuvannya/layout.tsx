import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'
import Footer from '@/sections/_shared/Footer'

export default function ChildrenProstheticsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header
        variant="childrenProsthetics"
        sideMenu="childrenProsthetics"
        ancorLinks
        arrowUp={false}
      />
      {children}
      <Footer layout="childrenProstheticsPage" />
    </>
  )
}
