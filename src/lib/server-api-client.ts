// lib/server-api-client.ts
import { serverEnv } from '@/env/server'
import { cookies, headers } from 'next/headers'

interface ServerApiOptions extends RequestInit {
  skipRefresh?: boolean
}

export async function serverApiFetch(
  endpoint: string,
  options: ServerApiOptions = {},
): Promise<Response> {
  const { skipRefresh, ...fetchOptions } = options
  const cookieStore = await cookies()

  // Pegar token dos cookies
  const token = cookieStore.get('token')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!token) {
    throw new Error('No access token available')
  }

  const url = new URL(endpoint, serverEnv.API_URL)

  // Primeira tentativa com token atual
  let response = await fetch(url, {
    ...fetchOptions,
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  })

  // Se recebeu 401 e tem refresh token, tentar renovar
  if (response.status === 401 && refreshToken && !skipRefresh) {
    try {
      const newTokens = await refreshTokensServerSide(refreshToken)

      if (newTokens) {
        // Tentar requisição novamente com novo token
        response = await fetch(url, {
          ...fetchOptions,
          headers: {
            Authorization: `Bearer ${newTokens.accessToken}`,
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
        })
      }
    } catch (refreshError) {
      console.error('Server-side refresh failed:', refreshError)
      throw new Error('Authentication failed')
    }
  }

  return response
}

async function refreshTokensServerSide(refreshToken: string): Promise<{
  accessToken: string
  refreshToken: string
} | null> {
  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    const forwardFor = headersList.get('x-forwarded-for')

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
      return null
    }

    const tokens = await response.json()

    // IMPORTANTE: Não podemos atualizar cookies diretamente em Server Components
    // Os novos tokens ficam apenas na memória desta requisição
    // O cliente precisará fazer um novo refresh via Route Handler

    return tokens
  } catch (error) {
    console.error('Server-side token refresh error:', error)
    return null
  }
}

// Função auxiliar para suas APIs existentes
export async function getServerToken(): Promise<string> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    throw new Error('No access token available')
  }

  return token
}
