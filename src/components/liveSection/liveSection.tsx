'use client'

import { useEffect, useState } from 'react'

export default function LiveSection({ channelId }: { channelId: string }) {
  const [isLive, setIsLive] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAvailability() {
      const { status } = await fetch('/api/islive', { cache: 'no-cache' })
      setIsLive(status !== 404)
    }
    checkAvailability()
    return () => {
      setIsLive(false)
    }
  }, [])

  if (!isLive) {
    return null
  }

  const handleLiveClick = () => {
    window.open(`https://www.youtube.com/channel/${channelId}/live`, '_blank')
  }

  return (
    <button
      onClick={handleLiveClick}
      className="fixed bottom-4 right-4 z-50  bg-gray-800 text-destructive-foreground px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
      aria-label="Ir para live"
    >
      <div className="absolute inset-0 bg-background rounded-full">
        <img
          src="/assets/coca_head.png"
          alt=""
          className="w-full h-full object-cover rounded-full opacity-60"
        />
      </div>
      <div className="w-3 h-3 bg-red-400 rounded-full relative z-10"></div>
      <span className="relative z-10">AO VIVO</span>
    </button>
  )
}
