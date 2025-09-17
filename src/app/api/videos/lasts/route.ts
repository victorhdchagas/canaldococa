import { getVideos } from '@/core/videos.service'

export async function GET() {
  const entries = await getVideos()
  return Response.json(entries)
}
