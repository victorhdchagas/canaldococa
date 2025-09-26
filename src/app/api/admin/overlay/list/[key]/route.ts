import { getUserFromCookies } from '@/core/cookie.service'
import { CustomError } from '@/core/exceptions/errors'
import { serverApiFetch } from '@/lib/server-api-client'
import { NextRequest } from 'next/server'

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/admin/overlay/list/[key]'>,
) {
  const { key } = await ctx.params
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN') {
      return Response.json('Unauthorized', { status: 401 })
    }
    const response = await serverApiFetch('/admin/live/overlays', {
      method: 'GET',
      next: { tags: ['admin/overlays'] },
    })
    const json = await response.json()
    const toReturn = json.find((d: any) => d.internalName === key)
    if (!toReturn) return Response.json(null, { status: 404 })
    return Response.json(toReturn)
  } catch (err) {
    if (err instanceof CustomError)
      return Response.json(err.message, { status: err.baseStatus })
    console.error(err)
    return Response.json(err)
  }
}
