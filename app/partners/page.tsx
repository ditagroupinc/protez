'use client'

import AllOurPartners from '@/sections/AllOurPartners'
import ProtezHeader from '@/sections/protez/ProtezHeader'
import Footer from '@/sections/Footer'

export default function Partners() {
  return (
    <>
      <ProtezHeader ancorLinks={false} arrowUp={false} />
      <main>
        <AllOurPartners />
      </main>
      <Footer />
    </>
  )
}
