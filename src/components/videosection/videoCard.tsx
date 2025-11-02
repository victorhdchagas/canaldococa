import { Video } from '@/types/services'
import Image from 'next/image'
import React from 'react'
import { EyeFreeIcons, Calendar01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div
      className="bg-card rounded-t-2xl flex flex-col justify-between gap-2
      border border-border
     select-none relative shadow-m hover:scale-105 hover:rotate-1 hover:z-10 transition-transform animate-fade-in group md:max-w-[365px]"
    >
      <div className="relative">
        <img
          alt="video thumbnail"
          src={video.media.thumbnail}
          className="rounded-t-2xl rounded-b-sm w-full"
        />
      </div>
      <div
        className="bg-gradient-to-b from-card to-muted
      flex flex-col h-full w-full gap-3"
      >
        <span className="text-lg text-foreground px-4 font-bold">
          {video.title}
        </span>
        <div className="flex flex-col gap-2 px-4 pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={EyeFreeIcons} size={16} />
            <span>{video.media.community.statistics.views} views</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={Calendar01FreeIcons} size={16} />
            <span>
              {video.published.toLocaleDateString('pt-br', {
                timeZone: 'America/Sao_Paulo',
              })}
            </span>
          </div>
          <div className="flex justify-end">
            <a
              href={video.link}
              className="text-foreground hover:text-foreground/80 text-base font-semibold transition-colors"
              target="_blank"
            >
              Acessar vídeo →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
