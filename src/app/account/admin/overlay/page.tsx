import HeaderSection from '@/components/headerSection/headerSection'
import Title from '@/components/text/title'
import OverlayLinkSection from './(components)/overlayLinkSection'
import OverlayListSection from './(components)/overlayListSection'
import { Suspense } from 'react'

export default function OverlayPage() {
  return (
    <div className="font-sans bg-gray-900 gap-6 flex flex-col h-screen text-white  mx-auto md:justify-start container">
      <HeaderSection />
      <Title>Overlay</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <OverlayListSection />
      </Suspense>

      <OverlayLinkSection />
    </div>
  )
}
