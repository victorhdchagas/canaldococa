import { Video } from '@/types/services'
import React from 'react'

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="bg-gray-900 rounded-t-2xl flex flex-col justify-between gap-2 select-none relative shadow-md hover:scale-105 transition-transform animate-fade-in group md:max-w-[365px]">
      <div className="relative">
        <img
          src={video.media.thumbnail}
          className="border-2 border-red-800 rounded-t-2xl rounded-b-sm md:group-hover:opacity-100 md:opacity-80 transition-all"
        />
        <span className="absolute bottom-2 right-3 text-gray-300 z-10">
          Views {video.media.community.statistics.views}
        </span>
      </div>
      <span className="text-xl text-yellow-500 font-bold px-4 pb-2">
        {video.title}
      </span>
      <div className="flex flex-row justify-between w-full px-4 pb-4">
        <span className="text-sm text-gray-400">
          {video.published.toLocaleDateString('pt-br', {
            timeZone: 'America/Sao_Paulo',
          })}
        </span>
        <a
          href={video.link}
          className="text-md text-red-600 font-semibold hover:text-red-500 transition-colors"
          target="_blank"
        >
          Acessar
        </a>
      </div>
    </div>
  )
}
