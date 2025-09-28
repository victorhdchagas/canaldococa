import HeaderSection from '@/components/headerSection/headerSection'
import Title from '@/components/text/title'
import OverlayLinkSection from './(components)/overlayLinkSection'
import OverlayListSection from './(components)/overlayListSection'
import { Suspense } from 'react'
import PageContainer from '@/components/Page/PageContainer'

export default function OverlayPage() {
  return (
    <PageContainer>
      <HeaderSection />
      <Title>Overlay</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <OverlayListSection />
      </Suspense>

      <OverlayLinkSection />
    </PageContainer>
  )
}
