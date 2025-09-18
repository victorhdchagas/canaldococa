import FooterSection from '@/components/footerSection/footerSection'
import HeaderSection from '@/components/headerSection/headerSection'
import HeroSection from '@/components/heroSection/heroSection'
import LiveSection from '@/components/liveSection/liveSection'
import VideoSection from '@/components/videosection/videosSection'

export default function Home() {
  return (
    <div className="font-sans bg-gray-900 gap-4 flex flex-col h-screen">
      <HeaderSection />
      <HeroSection />
      <LiveSection channelId={process.env.YOUTUBE_CHANNEL_ID!} />
      <VideoSection />

      <FooterSection socialNetworks={[]} />
    </div>
  )
}
