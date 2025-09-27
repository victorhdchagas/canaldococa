import { Video } from '@/types/services'
import React from 'react'

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div
      className="bg-gray-900  rounded-t-2xl flex flex-col justify-between gap-2
      border border-gray-700 
     select-none relative shadow-md hover:scale-105 hover:rotate-1 hover:z-10 transition-transform animate-fade-in group md:max-w-[365px]"
    >
      <div className="relative">
        <img
          src={video.media.thumbnail}
          className="rounded-t-2xl rounded-b-sm md:group-hover:opacity-100 md:opacity-80 transition-all"
        />
        <span className="absolute bottom-2 right-3 text-gray-300 z-10">
          Views {video.media.community.statistics.views}
        </span>
      </div>
      <div
        className="bg-gradient-to-b from-gray-900 to-gray-800
      flex flex-col justify-between h-full w-full pb-2 gap-3"
      >
        <span className="text-xl text-yellow-500 px-1.5 font-bold">
          {video.title}
        </span>
        <div className="flex flex-row justify-between w-full px-4 items-end ">
          <span className="text-sm text-gray-500">
            {video.published.toLocaleDateString('pt-br', {
              timeZone: 'America/Sao_Paulo',
            })}
          </span>
          <a
            href={video.link}
            className="text-md font-semibold transition-all
            border rounded-sm hover:rounded-br-xl px-2 py-1 bg-yellow-500 text-gray-900 hover:bg-yellow-600"
            target="_blank"
          >
            Acessar
          </a>
        </div>
      </div>
    </div>
  )
}
