import { getToken } from '@/core/cookie.service'
import { CustomError } from '@/core/exceptions/errors'
import axios from 'axios'

let lastUrl: string = ''
export async function POST() {
  try {
    const token = await getToken()

    if (!token) {
      return Response.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const data = await axios.post(
      `${process.env.API_BASEURL}/admin/live/overlay-key`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    lastUrl = `${process.env.API_BASEURL}?key=${data.data.key}`
    return new Response(lastUrl, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (err) {
    if (err instanceof CustomError)
      return Response.json(err.message, { status: err.baseStatus })
    console.error(err)
    return Response.json(err)
  }
}
export async function GET() {
  try {
    const token = await getToken()

    if (!token) {
      return Response.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const data = await axios.get(
      `${process.env.API_BASEURL}/admin/live/overlay-key`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    lastUrl = `${process.env.API_BASEURL}?key=${data.data.key}`

    return new Response(lastUrl, {
      headers: { 'Content-Type': 'text/plan' },
      status: 200,
    })
  } catch (err) {
    if (err instanceof CustomError)
      return Response.json(err.message, { status: err.baseStatus })
    console.error(err)
    return Response.json(err)
  }
}
