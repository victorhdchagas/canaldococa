import { isTokenValid } from '@/core/cookie.service'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('token')
  if (!tokenCookie || !tokenCookie.value) return Response.json({ user: null })
  try {
    const user = await isTokenValid(tokenCookie.value)
    if (!user) return Response.json({ user: null })

    return Response.json({
      user: { ...user, createdAt: new Date(user.createdAt) },
    })
  } catch (error) {
    console.log(error)
    return Response.json({ user: null })
  }
}
