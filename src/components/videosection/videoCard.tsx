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
      w-full 
     select-none relative shadow-m hover:scale-105 hover:rotate-1 hover:z-10 transition-transform animate-fade-in group md:max-w-[365px]"
    >
      <Image
        alt="video thumbnail"
        src={video.media.thumbnail}
        width={365}
        height={200}
        className="rounded-t-2xl rounded-b-sm w-full h-auto object-cover"
      />
      <div
        className="
        px-1
      flex flex-col justify-between h-full w-full overflow-hidden "
      >
        <span className="text-lg text-foreground px-4 font-bold  hyphens-manual">
          {video.title
            .substring(0, 40)
            .concat(video.title.length > 39 ? '...' : '')}
        </span>
        <div className="flex flex-col gap-2 px-4">
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
          <div className="flex justify-end pb-2">
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
