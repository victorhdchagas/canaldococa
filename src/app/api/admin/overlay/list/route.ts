import { getUserFromCookies } from '@/core/cookie.service'
import { CustomError } from '@/core/exceptions/errors'
import { serverApiFetch } from '@/lib/server-api-client'

export async function GET() {
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN') {
      return Response.json('Unauthorized', { status: 401 })
    }
    const response = await serverApiFetch('/admin/live/overlays', {
      method: 'GET',
      next: { tags: ['admin/overlays'] },
    })
    const toReturn = await response.json()
    return Response.json(toReturn)
  } catch (err) {
    if (err instanceof CustomError)
      return Response.json(err.message, { status: err.baseStatus })
    console.error(err)
    return Response.json(err)
  }
}
