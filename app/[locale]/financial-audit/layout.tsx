import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'
import Footer from '@/sections/_shared/Footer'

export default function FinancialAuditLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="childrenProsthetics" sideMenu="home" ancorLinks={false} arrowUp={false} />
      {children}
      <Footer layout="childrenProstheticsPage" />
    </>
  )
}
