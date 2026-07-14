import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'
import Footer from '@/sections/_shared/Footer'

export default function ThankYouLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="general" ancorLinks={false} arrowUp={false} />
      {children}
      <Footer layout="protezPage" />
    </>
  )
}
