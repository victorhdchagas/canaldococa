import LoginButton from '@/components/LoginButton'
import VideoSection from '@/components/videosection/videosSection'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20">
      <header className="flex flex-row bg-red-200 flex-auto w-full text-2xl font-bold text-black justify-around h-14 items-center">
        <h1>Live do Coca</h1>
        <span>Teste</span>
      </header>

      <VideoSection />
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <LoginButton />
      </main> */}
    </div>
  )
}
