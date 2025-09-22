import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify, importSPKI } from 'jose'

let cachedPublicKey: any | null = null

async function getPublicKey() {
  if (cachedPublicKey) {
    return cachedPublicKey
  }
  try {
    const response = await fetch(`${process.env.API_BASEURL}/auth/public-key`)
    const text = await response.text()
    const publicKey = await importSPKI(text, 'RS256')
    cachedPublicKey = publicKey
    return publicKey
  } catch (error) {
    console.error('Failed to fetch or import public key:', error)
    return null
  }
}

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (request.nextUrl.pathname.startsWith('/account')) {
    const publicKey = await getPublicKey()
    if (!publicKey) {
      console.error('Public key not available.')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Verifica o token usando a chave pública
      const payload = await jwtVerify(token, publicKey, {
        algorithms: ['RS256'],
      })
      // Se a verificação for bem-sucedida, continua a requisição
      return NextResponse.next()
    } catch (error) {
      console.error('JWT verification failed:', error)
      // Se a verificação falhar, redireciona para o login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Continua para outras rotas não protegidas
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*'],
}
