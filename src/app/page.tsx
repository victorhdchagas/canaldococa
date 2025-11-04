import BecomeSubscriberSection from '@/components/becomeSubSection/becomeSubSection'
import FooterSection from '@/components/footerSection/footerSection'
import HeaderSection from '@/components/headerSection/headerSection'
import HeroSection from '@/components/heroSection/heroSection'
import LastVideoSection from '@/components/lastvideo/lastvideosection'
import LiveSection from '@/components/liveSection/liveSection'
import VideoSection from '@/components/videosection/videosSection'

export default function HomePage() {
  return (
    <>
      <div className="font-sans bg-gray-900 flex flex-col h-screen  text-white  mx-auto md:justify-start container">
        <HeaderSection />
        <HeroSection />
        <LiveSection channelId={process.env.YOUTUBE_CHANNEL_ID!} />
        <LastVideoSection />
        <VideoSection />
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
    </>
  )
}
