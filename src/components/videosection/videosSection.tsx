import { Video } from '@/types/services'
import axios from 'axios'
import React from 'react'
import VideoCard from './videoCard'

export default async function VideoSection() {
  const response = await axios.get<Video[]>(
    'http://localhost:3001/api/videos/lasts',
  )
  const data = response.data.map((video) => ({
    ...video,
    published: new Date(video.published),
  }))
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mx-auto gap-8 md:gap-2 container overflow-auto min-h-1/2 max-h-1/2">
      <span className="text-yellow-500 text-4xl mx-auto py-4 font-bold">
        Ultimos vídeos
      </span>
      {data.map((video) => (
        <VideoCard video={video} key={video.videoId} />
      ))}
    </div>
  )
}
