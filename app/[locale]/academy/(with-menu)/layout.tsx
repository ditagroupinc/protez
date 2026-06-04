import { ReactNode } from 'react'

import Header from '@/sections/_shared/Header'

export default function AcademyWithMenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="academy" />
      {children}
    </>
  )
}
