import { getVideos } from '@/core/videos.service'
import VideoCard from './videoCard'

export default async function VideoSection() {
  const videos = await getVideos()
  videos.shift()
  videos.splice(8)
  return (
    <section
      className="flex flex-col mx-auto gap-4 container bg-background"
      id="videos"
    >
      <span className="text-primary text-4xl mx-auto py-8 font-bold">
        Meus vídeos
      </span>
      <div className="flex flex-wrap gap-4 justify-start">
        {videos.map((video) => (
          <VideoCard video={video} key={video.videoId} />
        ))}
      </div>
    </section>
  )
}
