'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

export default function LiveSection({ channelId }: { channelId: string }) {
  const [isLive, setIsLive] = useState<boolean | null>(null)
  const ytlive = `https://www.youtube.com/embed/live_stream?channel=${channelId}`

  useEffect(() => {
    async function checkAvaiability() {
      const { status } = await fetch('/api/islive', { cache: 'no-cache' })
      setIsLive(status < 400)
    }
    checkAvaiability()
    return () => {
      setIsLive(false)
    }
  }, [])

  if (!isLive) {
    return <LiveCard title="Ops, a live tá fora do ar."></LiveCard>
  }

  if (isLive)
    return (
      <LiveCard title="Live tá rolando">
        <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={ytlive}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </LiveCard>
    )

  return <LiveCard title="Verificando se a live esta ao vivo."></LiveCard>
}

function LiveCard({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="container mx-auto flex flex-col w-full pb-4 bg-gray-900 transition-all">
      <span className="text-yellow-500 text-4xl mx-auto py-4 font-bold">
        {title}
      </span>
      {children}
    </section>
  )
}
