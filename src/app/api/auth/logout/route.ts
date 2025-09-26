// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })

  // Limpar todos os cookies de autenticação
  const cookiesToClear = [
    'token',
    'refreshToken',
    'discordToken',
    'discordRefreshToken',
  ]

  cookiesToClear.forEach((cookieName) => {
    response.cookies.delete(cookieName)
  })

  return response
}

// Função utilitária para usar em outros Route Handlers
export function clearAuthCookies(response: NextResponse) {
  const cookiesToClear = [
    'token',
    'refreshToken',
    'discordToken',
    'discordRefreshToken',
  ]

  cookiesToClear.forEach((cookieName) => {
    response.cookies.delete(cookieName)
  })

  return response
}
