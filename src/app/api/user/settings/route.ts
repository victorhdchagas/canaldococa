import { getToken } from '@/core/cookie.service'
import { UserSettingsSchema } from '@/core/schemas/userDataSchema'
import { serverEnv } from '@/env/server'
import { NextRequest } from 'next/server'

export async function GET() {
  const token = await getToken()
  if (!token) return Response.json(['Falha na credencial'], { status: 401 })

  const response = await fetch(`${serverEnv.API_URL}/user/me`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
  if (response.status >= 400) {
    return Response.json(['Falha de conexão com o servidor'], {
      status: response.status,
    })
  }
  return Response.json(await response.json())
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsedBody = UserSettingsSchema.safeParse(body)
  if (!parsedBody.success) {
    return Response.json(
      parsedBody.error.issues.map((iss) => iss.message),
      { status: 400 },
    )
  }
  const token = await getToken()
  if (!token) return Response.json(['Falha na credencial'], { status: 401 })

  const response = await fetch(`${serverEnv.API_URL}/user/me`, {
    method: 'PUT',

    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedBody.data),
  })
  console.log(parsedBody.data)
  if (response.status >= 400) {
    console.log(await response.json())
    return Response.json(['Falha de conexão com o servidor'], {
      status: response.status,
    })
  }

  const responseData = await response.json()
  return Response.json(responseData)
}
