import HeaderSection from '@/components/headerSection/headerSection'
import Title from '@/components/text/title'
import SubscribersSettings from './(components)/subscribersSettings'

export default function OverlayPage() {
  return (
    <div className="font-sans bg-gray-900 gap-6 flex flex-col h-screen overflow-auto text-white  mx-auto">
      <HeaderSection />
      <Title>Alerta de subscribers</Title>
      <SubscribersSettings />
    </div>
  )
}
