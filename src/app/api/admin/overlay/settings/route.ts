import { getUserFromCookies } from '@/core/cookie.service'
import { unauthorized } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function PATCH(request: NextRequest) {
  const body = request.body
  return Response.json(body, {
    status: 200,
  })
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN') unauthorized()
    const name = new URL(request.url).searchParams.get('name')
    if (!name)
      return new Response('Invalid name', {
        headers: {
          'Content-Type': 'text/plain',
        },
        status: 400,
      })

    const data = await getFakeSettings(name)

    return Response.json(data)
  } catch {
    unauthorized()
  }
}

async function getFakeSettings(name: string) {
  return {
    id: name,
    position: 'top-left',
    duration: 2000,
    image:
      'https://placehold.co/256x126/yellow/white?font=roboto&text=Bem+vindo',
    sound: 'https://www.myinstants.com/media/sounds/drama-alert-intro.mp3',
    enabled: Math.random() >= 0.5,
    updatedAt: new Date(),
  }
}
