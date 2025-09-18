import axios from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Example: handle Discord OAuth callback
  const url = new URL(req.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { error: 'Missing code parameter' },
      { status: 400 },
    )
  }
  try {
    const serverResponse = await axios.get(
      `http://localhost:3000/auth/discord/callback?code=${code}`,
      {
        withCredentials: true,
      },
    )
    const body = serverResponse.data
    console.log(serverResponse)
    const cookiestore = await cookies()
    cookiestore.set('token', body.access_token)
    cookiestore.set('user', JSON.stringify(body.user))
    return NextResponse.redirect(new URL('/account', 'http://localhost:3001'))
  } catch {
    return NextResponse.json(
      { error: 'Missing code parameter' },
      { status: 400 },
    )
  }
  //   return NextResponse.json({ message: 'Discord callback received', code })
}
