import HeaderSection from '@/components/headerSection/headerSection'
import Title from '@/components/text/title'
import SubscribersSettings from './(components)/subscribersSettings'
import { getAllOverlays } from '@/core/admin/overlay.service'
import Subtitle from '@/components/text/subtitle'

export default async function OverlayPage() {
  //   const overlays = await getAllOverlays()
  //   const subscribersAlert = overlays.find(
  //     (item: any) => item.internalName === 'subscribers-settings',
  //   )
  return (
    <div className="font-sans bg-gray-900 gap-6 flex flex-col h-screen overflow-auto text-white  mx-auto">
      <HeaderSection />
      <SubscribersSettings />
    </div>
  )
}
