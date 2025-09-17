import { Video } from '@/types/services'
import React from 'react'

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="bg-red-800 rounded-t-2xl flex flex-col justify-between gap-2 select-none relative">
      <div className="relative">
        <img
          src={video.media.thumbnail}
          className="border-4 border-yellow-400 rounded-t-2xl rounded-b-sm "
        />
        <span className="absolute bottom-2 z-10 right-3 text-gray-300">
          Views {video.media.community.statistics.views}
        </span>
      </div>
      <span className="text-2xl text-yellow-400 font-extrabold text-shadow-amber-950 text-shadow-lg px-4 pb-2">
        {video.title}
      </span>

      <div className="flex flex-row justify-around w-full px-4 pb-4">
        <span className="text-md">
          {video.published.toLocaleDateString('pt-br', {
            timeZone: 'AMERICA/Sao_paulo',
          })}{' '}
        </span>
        <a
          href={video.link}
          className="text-xl text-amber-100 font-bold"
          target="_blank"
        >
          Acessar
        </a>
      </div>
    </div>
  )
}
