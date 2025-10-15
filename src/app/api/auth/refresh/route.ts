import { serverEnv } from '@/env/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token found' },
        { status: 401 },
      )
    }

    const userAgent = request.headers.get('user-agent')
    const forwardFor = request.headers.get('x-forwarded-for')

    const response = await fetch(`${serverEnv.API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(userAgent ? { 'User-Agent': userAgent } : {}),
        ...(forwardFor ? { 'x-forwarded-for': forwardFor } : {}),
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      // Refresh token inválido, limpar TODOS os cookies de auth
      const clearResponse = NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 },
      )

      // Limpar todos os cookies relacionados à autenticação
      clearResponse.cookies.delete('token')
      clearResponse.cookies.delete('refreshToken')
      clearResponse.cookies.delete('discordToken')
      //   clearResponse.cookies.delete('discordRefreshToken')

      return clearResponse
    }

    const { accessToken, refreshToken: newRefreshToken } = await response.json()

    // Criar resposta com sucesso e novos cookies
    const successResponse = NextResponse.json({ success: true })

    successResponse.cookies.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    successResponse.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return successResponse
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
