import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'

export default function HomeWithMenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="home" />
      {children}
    </>
  )
}
