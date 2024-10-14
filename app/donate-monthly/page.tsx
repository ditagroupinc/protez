'use client'

import Footer from '@/sections/Footer'
import ProtezHeader from '@/sections/protez/ProtezHeader'
import DonorBox from '@/sections/Donorbox'

export default function DonateMonthly() {
  return (
    <>
      <ProtezHeader ancorLinks={false} arrowUp={false} />
      <main>
        <DonorBox className={''} monthly />
      </main>
      <Footer />
    </>
  )
}
