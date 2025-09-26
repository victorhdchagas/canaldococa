import HeaderSection from '@/components/headerSection/headerSection'
import Title from '@/components/text/title'
import OverlayLinkSection from './(components)/overlayLinkSection'
import OverlayListSection from './(components)/overlayListSection'
import { Suspense } from 'react'

export default function OverlayPage() {
  return (
    <div className="font-sans bg-gray-900 gap-6 flex flex-col h-screen text-white  mx-auto">
      <HeaderSection />
      <Title>Overlay</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <OverlayListSection />
      </Suspense>
      {/* <section className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 gap-4 px-2 container mx-auto">
        {overlays.map((overlay: any) => (
          <BoxLink href={`overlay/${overlay.internalName}`} key={overlay.id}>
            {overlay.name}
          </BoxLink>
        ))}
      </section> */}
      <OverlayLinkSection />
    </div>
  )
}
