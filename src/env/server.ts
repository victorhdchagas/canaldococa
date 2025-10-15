import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    API_URL: z.url(),
    YoutubeChannelID: z.string().min(5),
  },
  runtimeEnv: {
    API_URL: process.env.API_BASEURL,
    YoutubeChannelID: process.env.YOUTUBE_CHANNEL_ID,
  },
})
