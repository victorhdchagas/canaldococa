import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) {
    return NextResponse.json(
      { error: 'Missing code parameter' },
      { status: 400 },
    )
  }

  const userAgent = req.headers.get('user-agent') // e.g., 'localhost:3000' or 'example.com'
  const forwardFor = req.headers.get('x-forwarded-for')
  try {
    const serverResponse = await axios.get(
      `${process.env.API_BASEURL}/auth/discord/callback?code=${code}`,
      {
        headers: {
          ...(userAgent ? { 'User-Agent': userAgent } : null),
          ...(forwardFor ? { 'x-forward-for': forwardFor } : null),
        },
      },
    )

    const {
      accessToken,
      refreshToken,
      discordAccessToken,
      discordRefreshToken,
    } = serverResponse.data

    const redirectUrl = new URL('/account', 'http://localhost:3001')
    // Crie uma resposta de redirecionamento.
    const response = NextResponse.redirect(redirectUrl)

    // Defina os cookies no objeto de resposta.
    response.cookies.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Use 'lax' para redirecionamento. 'none' é para cross-site.
      path: '/',
    })
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    response.cookies.set('discordToken', discordAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    response.cookies.set('discordRefreshToken', discordRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Error during Discord callback:', err)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    )
  }
}
