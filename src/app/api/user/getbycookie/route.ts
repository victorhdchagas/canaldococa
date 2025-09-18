import { getUserFromCookies } from '@/core/cookie.service'

export async function GET() {
  const user = await getUserFromCookies()
  return Response.json({ user: user || null })
}
