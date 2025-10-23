import { clientEnv } from '@/env/client'
import { serverEnv } from '@/env/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const currentRefreshToken = cookieStore.get('discordRefreshToken')?.value

    if (!currentRefreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'No refresh token found',
          authUrl: constructDiscordAuthUrl(),
        },
        { status: 401 },
      )
    }

    const userAgent = request.headers.get('user-agent')
    const forwardFor = request.headers.get('x-forwarded-for')
    const apiendpoint = new URL('auth/refreshDiscord', serverEnv.API_URL)
    //RefreshDiscordToken
    const tokenResponse = await fetch(apiendpoint, {
      method: 'POST',
      headers: {
        ...(userAgent ? { 'User-Agent': userAgent } : null),
        ...(forwardFor ? { 'x-forward-for': forwardFor } : null),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    })

    // RefreshDiscordToken Fallback
    if (!tokenResponse.ok) {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired refresh token',
          authUrl: constructDiscordAuthUrl(),
        },
        { status: 401 },
      )

      response.cookies.set('discordRefreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // Remove o cookie
      })

      return response
    }
    //RefreshDiscordToken Refreshed
    const tokens = await tokenResponse.json()
    const { accessToken, refreshToken, discordRefreshToken } = tokens
    const response = NextResponse.json({
      success: true,
      message: 'Sessão atualizada',
      redirectUrl: new URL('/account', request.nextUrl.origin),
    })

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

    response.cookies.set('discordRefreshToken', discordRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Erro na API de login:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        authUrl: constructDiscordAuthUrl(),
      },
      { status: 500 },
    )
  }
}

function constructDiscordAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: clientEnv.NEXT_PUBLIC_DISCORD_CLIENT_ID.toString(),
    redirect_uri: clientEnv.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email',
  })

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`
}
