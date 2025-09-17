import axios from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cookiestore = await cookies()
  const cookieuser = cookiestore.get('user')
  if (!cookieuser || !cookieuser.value)
    return NextResponse.json({ error: 'Usuário desconhecido' }, { status: 404 })

  //   const user = JSON.parse(cookieuser.value)
  const { priceId } = await req.json()
  if (!priceId) return NextResponse.json({ error: 'Serviço desconhecido' })

  try {
    const serverResponse = await axios.post(
      'http://localhost:3000/payments/create-checkout-session',
      {
        priceId,
      },
      { withCredentials: true },
    )
    return NextResponse.json(serverResponse.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error no processamento' },
      { status: 400 },
    )
  }
  //   return NextResponse.json({ message: 'Discord callback received', code })
}
