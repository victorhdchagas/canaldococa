import {
  getPublicKey,
  getUserFromCookies,
  isTokenValid,
} from '@/core/cookie.service'
import { InvalidTokenException } from '@/core/exceptions/errors'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')!.value
  const pk = await getPublicKey()
  if (!pk || !token) throw new Error('User unauthorized')
  try {
    const user = await isTokenValid(token)
    if (!user) return Response.json({ user: null })

    return Response.json({
      user: { ...user, createdAt: new Date(user.createdAt) },
    })
  } catch (error) {
    console.log(error)
    return Response.json({ user: null })
  }
}
