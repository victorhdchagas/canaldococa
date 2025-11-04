import { getVideos } from '@/core/videos.service'
import Image from 'next/image'
import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Calendar01FreeIcons,
  EyeFreeIcons,
  ThumbsUpFreeIcons,
} from '@hugeicons/core-free-icons'

export default async function LastVideoSection() {
  const videos = await getVideos()
  const video = videos[0]
  return (
    <section
      id="video"
      className="bg-card rounded-2xl md:roundet-l-2xl flex flex-col md:flex-row justify-between gap-2 border border-border w-full select-none relative shadow-m transition-transform animate-fade-in group mt-8 md:max-w-3xl mx-auto"
    >
      <Image
        alt="video thumbnail"
        src={video.media.thumbnail}
        width={365}
        height={200}
        className="rounded-t-2xl md:rounded-l-2xl rounded-b-sm w-full h-auto object-cover"
      />
      <div className="px-1 flex flex-col py-4 h-full  overflow-hidden">
        <span className="text-2xl text-foreground px-4 mb-8 md:mt-8 font-bold  hyphens-manual">
          {video.title
            .substring(0, 40)
            .concat(video.title.length > 39 ? '...' : '')}
        </span>

        <div className="flex flex-col gap-2 px-4 pb-4 mt-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={EyeFreeIcons} size={16} />
            <span>{video.media.community.statistics.views} </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={ThumbsUpFreeIcons} size={16} />
            <span>{video.media.community.starRating.count}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={Calendar01FreeIcons} size={16} />
            <span>
              {video.published.toLocaleDateString('pt-br', {
                timeZone: 'America/Sao_Paulo',
              })}
            </span>
          </div>
        </div>
        <div className="flex  pb-2">
          <a
            href={video.link}
            className="ml-auto text-foreground hover:text-foreground/80 text-xl font-semibold transition-colors"
            target="_blank"
          >
            Acessar vídeo →
          </a>
        </div>
      </div>
    </section>
  )
}
