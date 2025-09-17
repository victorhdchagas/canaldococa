import { Video } from '@/types/services'
import axios from 'axios'
import * as convert from 'xml-js'

export async function getVideos(): Promise<Video[]> {
  // https://www.youtube.com/feeds/videos.xml?channel_id=UCIZuoDtcWbJgXwT9p41s2lg //UCi2Q2vgSu_f6YaH3WbBQxTg
  const xml = await getChannelString()
  const jsonResult = convert.xml2json(xml, {
    compact: true,
    ignoreComment: true,
    ignoreDeclaration: true,
  })
  return convertToReturningData(jsonResult)
}

async function getChannelString(): Promise<string> {
  const endpoint = `https://www.youtube.com/feeds/videos.xml?channel_id=${process.env.YOUTUBE_CHANNEL_ID}`
  const response = await axios.get(endpoint, {
    adapter: 'fetch',
    fetchOptions: { cache: 'force-cache', next: { revalidate: 3600 } },
  })
  return response.data
}

function convertToReturningData(data: string): Video[] {
  const feed = JSON.parse(data).feed
  function formatMedia(media: any): Video['media'] {
    const community = media['media:community']
    return {
      title: media['media:title']._text,
      thumbnail: media['media:thumbnail']._attributes.url,
      description: media['media:description']._text,
      community: {
        starRating: {
          average: parseInt(community['media:starRating']._attributes.average),
          count: parseInt(community['media:starRating']._attributes.count),
          min: parseInt(community['media:starRating']._attributes.min),
          max: parseInt(community['media:starRating']._attributes.max),
        },
        statistics: {
          views: parseInt(community['media:statistics']._attributes.views),
        },
      },
    } as Video['media']
  }
  return feed.entry.map((video: any) => ({
    id: video.id._text,
    videoId: video['yt:videoId']._text,
    channelId: video['yt:channelId']._text,
    title: video.title._text,
    link: video.link._attributes.href,
    author: video.author.name._text,
    published: new Date(video.published._text),
    updated: new Date(video.updated._text),
    media: formatMedia(video['media:group']),
  }))
}
