import { getUserConnections } from '@/core/user/connections'
import { NextRequest } from 'next/server'
import z from 'zod'

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/user/connections/[platform]'>,
) {
  const params = await ctx.params
  const schema = z.enum(['youtube', 'discord', 'kick'])
  const platform = schema.safeParse(params.platform.toLowerCase())
  if (!platform.success) {
    return Response.json({
      error: 'platform must be one of "youtube", "discord" or "kick"',
    })
  }
  try {
    const connections = await getUserConnections(platform.data)

    console.log(connections)
    return Response.json(connections)
  } catch (error) {}
}
