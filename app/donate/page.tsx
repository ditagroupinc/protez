'use client'

import Footer from '@/sections/Footer'
import ProtezHeader from '@/sections/protez/ProtezHeader'
import DonorBox from '@/sections/Donorbox'

export default function Donate() {
  return (
    <>
      <ProtezHeader ancorLinks={false} arrowUp={false} />
      <main>
        <DonorBox className={''} />
      </main>
      <Footer />
    </>
  )
}
