'use client'

import { authFetch } from '@/lib/auth-fetch'
import { OverlaySettings, OverlaySubscribersSettings } from '@/types/services'

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
    const response = await authFetch('/api/admin/overlay/list', {
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
      //   redirect('/login')
    }
    throw error
  }
}

export async function testOverlay(name: string): Promise<void> {
  const url = new URL(`${window.location.origin}/api/admin/overlay/test`)
  url.searchParams.set('name', name)
  const response = await authFetch(url, {
    method: 'PATCH',
    credentials: 'include',
  })
  if (response.status === 200) return
  throw new Error('Falha ao testar overlay')
}

export async function updateOverlaySettings(
  settings: Omit<OverlaySettings<OverlaySubscribersSettings>, 'enabled'> & {
    enabled: string
  },
) {
  const url = new URL(`${window.location.origin}/api/admin/overlay/settings`)
  url.searchParams.set('name', settings.internalName)
  const duration: string = settings.properties.duration.toString()

  const response = await authFetch(url, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({
      ...settings,
      enabled: settings.enabled === 'on',
      properties: {
        ...settings.properties,
        duration: parseInt(duration),
      },
    }),
  })
  if (response.status > 200) {
    throw new Error('Erro ao buscar o link do overlay')
  }
  const data = await response.json()
  if (data) return data
  throw new Error('Erro ao buscar o link do overlay')
}

export async function getOverlayImages(): Promise<string[]> {
  const url = new URL(
    `${window.location.origin}/api/admin/overlay/settings/images`,
  )
  try {
    const response = await authFetch(url, {
      credentials: 'include',
    })
    if (response.status < 300) return await response.json()
    throw new Error('OverlayImages Not Found')
  } catch {
    throw new Error('OverlayImages Not Found')
  }
}

export async function getOverlayAudios(): Promise<string[]> {
  const url = new URL(
    `${window.location.origin}/api/admin/overlay/settings/audios`,
  )
  try {
    const response = await authFetch(url, {
      credentials: 'include',
    })
    if (response.status < 300) return await response.json()
    throw new Error('OverlayImages Not Found')
  } catch {
    throw new Error('OverlayImages Not Found')
  }
}

export async function getOverlaySettings(
  name: string,
): Promise<OverlaySettings<OverlaySubscribersSettings>> {
  const url = new URL(
    `${window.location.origin}/api/admin/overlay/list/${name}`,
  )
  try {
    const response = await authFetch(url, {
      credentials: 'include',
    })
    if (response.status < 300) return await response.json()
    throw new Error(`${name} not found`)
  } catch {
    throw new Error(`${name} not found`)
  }
}

export async function getOverlayLink(): Promise<string> {
  const url = new URL(`${window.location.origin}/api/admin/overlay`)
  const response = await authFetch(url, {
    method: 'get',
    credentials: 'include',
  })
  if (response.status > 200) {
    throw new Error('Erro ao buscar o link do overlay')
  }
  const data = await response.text()
  if (data) return data
  throw new Error('Erro ao buscar o link do overlay')
}

export async function updateOverlayLink(): Promise<string> {
  const url = new URL(`${window.location.origin}/api/admin/overlay`)
  const response = await authFetch(url, {
    method: 'POST',
    credentials: 'include',
  })
  if (response.status > 200) {
    throw new Error('Erro ao buscar o link do overlay')
  }
  const data = await response.text()
  if (data) return data
  throw new Error('Erro ao buscar o link do overlay')
}
