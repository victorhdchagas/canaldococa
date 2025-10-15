import { clientEnv } from '@/env/client'

export async function GET() {
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientEnv.NEXT_PUBLIC_YOUTUBE_CLIENT_ID}&redirect_uri=${clientEnv.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly&access_type=offline&prompt=consent`.replace(
      /\s+/g,
      '',
    )
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
    },
  })
}
