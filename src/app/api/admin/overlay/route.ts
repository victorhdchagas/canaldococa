import { getUserFromCookies } from '@/core/cookie.service'
import { unauthorized } from 'next/navigation'
import { NextRequest } from 'next/server'

let lastUrl: string = ''
export async function PATCH(request: NextRequest) {
  lastUrl = `http://localhost:3001/admin/overlay?auth=${new Date().getTime()}`
  return new Response(lastUrl, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
export async function GET() {
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN') {
      unauthorized()
    }
    if (!lastUrl)
      lastUrl = `http://localhost:3001/admin/overlay?auth=${new Date().getTime()}`
    await getFakeList() //getClientPaymentStatus()

    return new Response(lastUrl, {
      headers: { 'Content-Type': 'text/plan' },
      status: 200,
    })
  } catch {
    unauthorized()
  }
}

async function getFakeList() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 2
}
