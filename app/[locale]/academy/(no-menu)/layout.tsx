import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'

export default function AcademyNoMenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="academy" sideMenu="none" ancorLinks={false} arrowUp={false} />
      {children}
    </>
  )
}
