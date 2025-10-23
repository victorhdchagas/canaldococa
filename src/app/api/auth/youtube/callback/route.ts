import { getToken } from '@/core/cookie.service'
import { serverEnv } from '@/env/server'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// comming url https://localhost:3001/api/auth/youtube/callback?code=4/0AVGzR1BGL7y1IVIjIGTmLXkUfOps9vwYAHhc-8GZkVS34ZLWJO6dFb4gcxkHiCM4iBnPbQ&scope=https://www.googleapis.com/auth/youtube.readonly
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const scope = url.searchParams.get('scope')

  const error = url.searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL('/account?status=error&message=Autorização negada', url),
    )
  }
  if (!code) {
    return new Response('Missing code parameter', { status: 400 })
  }
  const token = await getToken()
  try {
    const serverResponse = await axios.get(
      `${serverEnv.API_URL}/auth/youtube/callback?code=${code}&scope=${scope}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    revalidatePath('/account/admin')
    const redirectUrl = new URL(
      '/account/admin/connections/youtube?welcome=true',
      url.origin,
    )

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString(),
      },
    })
  } catch (err) {
    console.error('Error during Discord callback:\n', err)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    )
  }
}
