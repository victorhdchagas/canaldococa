import { isTokenValid } from '@/core/cookie.service'
import { serverEnv } from '@/env/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('token')
  console.log(tokenCookie)
  if (!tokenCookie || !tokenCookie.value)
    return Response.json({ error: 'Token não fornecido' })
  try {
    const user = await isTokenValid(tokenCookie.value)
    if (!user) return Response.json({ error: 'token inválido' })

    const response = await fetch(`${serverEnv.API_URL}/user/progression`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    })

    console.log('Progression Data:', await response.text())
    if (!response.ok) {
      return Response.json(
        { error: 'Erro ao buscar progressão do usuário' },
        { status: response.status },
      )
    }
    const progressionData = await response.json()
    return Response.json({
      user: {
        ...user,
        createdAt: new Date(user.createdAt),
        progression: progressionData,
      },
    })
  } catch (error) {
    console.log(error)
    return Response.json({ user: null })
  }
}
