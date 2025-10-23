import HeaderSection from '@/components/headerSection/headerSection'
import SubscribersSettings from './(components)/subscribersSettings'

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
