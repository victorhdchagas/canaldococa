import BecomeSubscriberSection from '@/components/becomeSubSection/becomeSubSection'
import BubblesSection from '@/components/bubbles/bubblesSection'
import FooterSection from '@/components/footerSection/footerSection'
import HeaderSection from '@/components/headerSection/headerSection'
import HeroSection from '@/components/heroSection/heroSection'
import LiveSection from '@/components/liveSection/liveSection'
import VideoSection from '@/components/videosection/videosSection'

export default function Home() {
  return (
    <div className="font-sans bg-gray-900 gap-4 not-first:gap-0 flex flex-col min-h-screen">
      <HeaderSection />
      <HeroSection />
      <LiveSection channelId={process.env.YOUTUBE_CHANNEL_ID!} />
      <VideoSection />
      <BubblesSection />
      <BecomeSubscriberSection />
      <FooterSection
        socialNetworks={[
          {
            id: 1,
            type: 'youtube',
            uri: 'https://www.youtube.com/@CocaLives',
          },
          {
            id: 2,
            type: 'kick',
            uri: 'https://kick.com/canaldococa',
          },
        ]}
      />
    </div>
  )
}
