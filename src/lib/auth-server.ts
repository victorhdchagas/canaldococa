// lib/auth-server.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { RefreshTokenException } from '@/core/exceptions/errors'
import { isTokenValid } from '@/core/cookie.service'

export async function validateSession(): Promise<{
  isValid: boolean
  needsRefresh: boolean
  payload?: any
}> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!token) {
    return { isValid: false, needsRefresh: false }
  }

  if (!refreshToken) {
    return { isValid: false, needsRefresh: false }
  }

  try {
    const payload = await isTokenValid(token)
    return {
      isValid: true,
      needsRefresh: false,
      payload,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof RefreshTokenException) {
      return {
        isValid: false,
        needsRefresh: true,
      }
    }
    console.error('error nao tratado no auth-server', error)

    return { isValid: false, needsRefresh: false }
  }
}

export async function requireAuth() {
  const session = await validateSession()

  // Se não tem token nem refresh token, redireciona
  if (!session.isValid && !session.needsRefresh) {
    redirect('/login')
  }

  if (session.needsRefresh) {
    return null
  }

  // Token válido, retorna os dados
  return session.payload
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()

  cookieStore.delete('token')
  cookieStore.delete('refreshToken')
  //   cookieStore.delete('discordToken')
  //   cookieStore.delete('discordRefreshToken')
}
