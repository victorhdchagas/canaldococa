import FooterSection from '@/components/footerSection/footerSection'
import HeaderSection from '@/components/headerSection/headerSection'
import HeroSection from '@/components/heroSection/heroSection'
import LiveSection from '@/components/liveSection/liveSection'
import LoginButton from '@/components/LoginButton'
import VideoSection from '@/components/videosection/videosSection'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="font-sans bg-gray-900 gap-4 flex flex-col h-screen">
      <HeaderSection />
      <HeroSection />
      <LiveSection channelId={process.env.YOUTUBE_CHANNEL_ID!} />
      <VideoSection />
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <LoginButton />
      </main> */}
      <FooterSection socialNetworks={[]} />
    </div>
  )
}
