import { User } from '@/types/services'
import { importSPKI, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import {
  AuthenticationException,
  InvalidTokenException,
  PublicKeyException,
  RefreshTokenException,
} from './exceptions/errors'
import { TokenPayload } from '@/types/auth'
import { JWTExpired } from 'jose/errors'

let cachedPublicKey: CryptoKey | null = null
export async function getRefreshToken(
  refreshToken: string,
  userAgent: string | null,
  forwardedFor: string | null,
) {
  const response = await fetch(`${process.env.API_BASEURL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(userAgent ? { 'User-Agent': userAgent } : null),
      ...(forwardedFor ? { 'x-forward-for': forwardedFor } : null),
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    console.log('\n\n\n', await response.text(), '\n\n\n Server response')
    throw new RefreshTokenException()
  }

  const { accessToken, refreshToken: newRefreshToken } = await response.json()
  return { accessToken, refreshToken: newRefreshToken }
}
export async function isTokenValid(
  token: string,
): Promise<TokenPayload | null> {
  try {
    const publicKey = await getPublicKey()
    const payload = await jwtVerify<TokenPayload>(token, publicKey, {
      algorithms: ['RS256'],
    })
    return payload.payload
  } catch (err) {
    if (err instanceof JWTExpired) {
      console.log('Token expirado, tentando renovar.')
      throw new RefreshTokenException()
    }

    // Se o erro for de outro tipo, lança uma exceção de autenticação
    console.error('Token inválido ou outro erro de autenticação:', err)
    throw new AuthenticationException()
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (token && token.value) return token.value
  return null
}

export async function getUserFromCookies(): Promise<User> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')!.value
  const pk = await getPublicKey()
  if (!pk || !token) throw new Error('User unauthorized')

  const user = await isTokenValid(token)
  if (!user) throw new InvalidTokenException()

  return { ...user, createdAt: new Date(user.createdAt) }
}

export async function getPublicKey(): Promise<CryptoKey> {
  if (cachedPublicKey) {
    return cachedPublicKey
  }

  try {
    const response = await fetch(`${process.env.API_BASEURL}/auth/public-key`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch public key from API.')
    }

    const text = await response.text()
    const publicKey = await importSPKI(text, 'RS256')

    cachedPublicKey = publicKey

    return publicKey
  } catch (error) {
    console.error('Failed to fetch or import public key:', error)
    throw new PublicKeyException()
  }
}
