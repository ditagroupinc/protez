import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'

export default function HomeNoMenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="home" sideMenu="none" ancorLinks={false} arrowUp={false} />
      {children}
    </>
  )
}
