import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const path = request.nextUrl.pathname

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/', '/login', '/api/auth']
  const isPublicRoute = publicRoutes.some(
    (route) => path.startsWith(route) || path === '/',
  )

  // Se é rota pública, permitir acesso
  if (isPublicRoute && !path.startsWith('/account')) {
    return NextResponse.next()
  }

  // Rotas protegidas - precisa ter pelo menos refresh token
  if (path.startsWith('/account')) {
    if (!token && !refreshToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect_to', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Se tem token válido e está tentando acessar login, redireciona
  if (token && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
