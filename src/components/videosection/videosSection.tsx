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
    <div className="grid grid-cols-1 grid-rows-[s] w-full gap-8">
      {data.map((video) => (
        <VideoCard video={video} key={video.videoId} />
      ))}
    </div>
  )
}
