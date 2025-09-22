import { User } from '@/types/services'
import { importSPKI, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function getUserFromCookies(): Promise<User> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')!.value
  const pk = await getPublicKey()
  if (!pk || !token) throw new Error('User unauthorized')

  const payload: {
    payload: {
      sub: number
      id: number
      username: string
      avatar: string
      role: string
      createdAt: string
    }
  } = await jwtVerify(token, pk, {
    algorithms: ['RS256'],
  })
  const user = payload.payload

  return { ...user, createdAt: new Date(user.createdAt) }
}

async function getPublicKey() {
  try {
    const response = await fetch(`${process.env.API_BASEURL}/auth/public-key`)
    const text = await response.text()
    const publicKey = await importSPKI(text, 'RS256')

    return publicKey
  } catch (error) {
    console.error('Failed to fetch or import public key:', error)
    return null
  }
}
