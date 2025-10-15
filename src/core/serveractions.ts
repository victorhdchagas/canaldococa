'use server'
import { isTokenValid } from '@/core/cookie.service'
import { RefreshTokenException } from '@/core/exceptions/errors'
import { serverEnv } from '@/env/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isValidSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  try {
    const payload = token ? await isTokenValid(token) : null
  } catch (error) {
    if (error instanceof RefreshTokenException) {
      if (refreshToken) {
        try {
          const headersList = await headers()
          const userAgent = headersList.get('user-agent') // e.g., 'localhost:3000' or 'example.com'
          const forwardFor = headersList.get('x-forwarded-for')
          const response = await fetch(`${serverEnv.API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(userAgent ? { 'User-Agent': userAgent } : null),
              ...(forwardFor ? { 'x-forward-for': forwardFor } : null),
            },
            body: JSON.stringify({ refreshToken }),
          })

          if (!response.ok) {
            cookieStore
              .getAll()
              .forEach(async (tk) => (await cookies()).delete(tk.name))
            return false
          }

          const { accessToken, refreshToken: newRefreshToken } =
            await response.json()

          cookieStore.set('token', accessToken)
          cookieStore.set('refreshToken', refreshToken)
          return true
        } catch (error) {
          console.error(error)
          cookieStore.delete('token')
          cookieStore.delete('refreshToken')
          return false
        }
      }
    }

    redirect('/login')
  }
}
