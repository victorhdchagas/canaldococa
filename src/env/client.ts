import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_WEBSOCKET_URL: z.url(),
    NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string(),
    NEXT_PUBLIC_DISCORD_REDIRECT_URI: z.string(),
    NEXT_PUBLIC_YOUTUBE_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_FRONTEND_BASEURL: z.url(),
    NEXT_PUBLIC_YOUTUBE_REDIRECT_URI: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    NEXT_PUBLIC_DISCORD_REDIRECT_URI: new URL(
      process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
      process.env.NEXT_PUBLIC_FRONTEND_BASEURL,
    ).toString(),

    NEXT_PUBLIC_YOUTUBE_CLIENT_ID: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID,
    NEXT_PUBLIC_FRONTEND_BASEURL: process.env.NEXT_PUBLIC_FRONTEND_BASEURL,
    NEXT_PUBLIC_YOUTUBE_REDIRECT_URI: new URL(
      process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI!,
      process.env.NEXT_PUBLIC_FRONTEND_BASEURL,
    ).toString(),
  },
})
