import { getVideos } from '@/core/videos.service'
import VideoCard from './videoCard'

export default async function VideoSection() {
  const videos = await getVideos()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mx-auto gap-8 md:gap-2 container overflow-auto min-h-1/2 max-h-1/2">
      <span className="text-yellow-500 text-4xl mx-auto py-4 font-bold">
        Ultimos vídeos
      </span>
      {videos.map((video) => (
        <VideoCard video={video} key={video.videoId} />
      ))}
    </div>
  )
}
