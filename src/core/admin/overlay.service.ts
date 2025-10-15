import { authFetch } from '@/lib/auth-fetch'
import { OverlaySettings } from '@/types/services'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getToken } from '../cookie.service'
import { serverEnv } from '@/env/server'

export async function updateOverlay(overlay: OverlaySettings<any>) {
  const url = new URL(`${serverEnv.API_URL!}/admin/live/overlays`)

  const token = await getToken()
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(overlay),
    // credentials: 'include',
  })
  if (response.status > 300) {
    const data = await response.json()
    throw data
  }
  const data = await response.json()
  if (data) {
    return data
  }
  return null
}

export async function getAllOverlays(): Promise<any> {
  //   // Primeiro validar se a sessão está ok
  //   const session = await validateSession()

  //   if (!session.isValid) {
  //     if (session.needsRefresh) {
  //       // Se precisa refresh, redirecionar para uma página que force o refresh
  //       // Ou você pode retornar um erro específico para o componente tratar
  //       redirect('/account?refresh=needed')
  //     } else {
  //       redirect('/login')
  //     }
  //   }

  try {
    // const response = await serverApiFetch('/admin/live/overlays', {
    const response = await authFetch('/api/admin/live/overlays', {
      method: 'GET',
      next: { tags: ['admin/overlays'] },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw errorData
    }

    const data = await response.json()
    return data || null
  } catch (error) {
    // Se o erro for de autenticação após tentativa de refresh
    if (error instanceof Error && error.message === 'Authentication failed') {
      redirect('/login')
    }
    throw error
  }
}

// Alternativa mais simples se você quiser manter sua estrutura atual
export async function getAllOverlaysSimple(): Promise<any> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  const url = new URL(`${serverEnv.API_URL!}/admin/live/overlays`)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { tags: ['admin/overlays'] },
    })

    // Se der 401, redirecionar para forçar refresh via client
    if (response.status === 401) {
      redirect('/account?refresh=needed')
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw data
    }

    const data = await response.json()
    return data || null
  } catch (error) {
    throw error
  }
}
