import { getUserFromCookies } from '@/core/cookie.service'
import { unauthorized } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    return Response.json([
      'https://www.myinstants.com/media/sounds/roll.mp3',
      'https://www.myinstants.com/media/sounds/drama-alert-intro.mp3',
      'https://www.myinstants.com/media/sounds/alerta_piano_athousandmiles.mp3',
    ])
  } catch {
    unauthorized()
  }
}
