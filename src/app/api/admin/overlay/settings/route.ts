import { getAllOverlays, updateOverlay } from '@/core/admin/overlay.service'
import { getUserFromCookies } from '@/core/cookie.service'
import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const response = await updateOverlay(body)
  if (response.success) revalidateTag('admin/overlays')
  return Response.json(response, {
    status: 200,
  })
}

// Removed
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN')
      return new Response('Invalid Role', {
        headers: {
          'Content-Type': 'text/plain',
        },
        status: 400,
      })

    const name = new URL(request.url).searchParams.get('name')
    if (!name)
      return new Response('Invalid name', {
        headers: {
          'Content-Type': 'text/plain',
        },
        status: 400,
      })

    const overlays = await getAllOverlays()
    const subscribersAlert = overlays.find(
      (item: any) => item.internalName === 'subscribers-settings',
    )

    return Response.json(subscribersAlert)
  } catch {
    return new Response('unknown error on settings', {
      headers: {
        'Content-Type': 'text/plain',
      },
      status: 400,
    })
  }
}
