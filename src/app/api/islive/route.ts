export async function GET() {
  const channelId = process.env.YOUTUBE_CHANNEL_ID! //'UCIZuoDtcWbJgXwT9p41s2lg' //UCi2Q2vgSu_f6YaH3WbBQxTg xoda
  const isLive = await checkIfYouTubeChannelIsLive(channelId)
  if (!isLive) return Response.json(null, { status: 400 })
  return Response.json({ isLive })
}

async function checkIfYouTubeChannelIsLive(channelId: string) {
  const liveCheck = `https://www.youtube.com/embed/live_stream?channel=${channelId}`
  const responseText = await fetch(liveCheck, {
    next: { revalidate: 600 },
  }).then((res) => res.text())
  const isLive = responseText.indexOf(`videoDurationSeconds\\":\\"0`) >= 0
  return isLive
}
