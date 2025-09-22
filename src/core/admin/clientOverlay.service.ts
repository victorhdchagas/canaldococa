'use client'

import { OverlaySubscribersSettings } from '@/types/services'

export async function testOverlay(name: string): Promise<void> {
  const url = new URL(`${window.location.origin}/api/admin/overlay/test`)
  url.searchParams.set('name', name)
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
  })
  if (response.status === 200) return
  throw new Error('Falha ao testar overlay')
}

export async function updateOverlaySettings(
  settings: OverlaySubscribersSettings,
) {
  const url = new URL(`${window.location.origin}/api/admin/overlay/settings`)
  url.searchParams.set('name', settings.id)
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(settings),
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
    const response = await fetch(url, {
      credentials: 'include',
    })
    if (response.status < 300) return await response.json()
    console.log(await response.text())
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
    const response = await fetch(url, {
      credentials: 'include',
    })
    if (response.status < 300) return await response.json()
    console.log(await response.text())
    throw new Error('OverlayImages Not Found')
  } catch {
    throw new Error('OverlayImages Not Found')
  }
}

export async function getOverlaySettings(
  name: string,
): Promise<OverlaySubscribersSettings> {
  const url = new URL(`${window.location.origin}/api/admin/overlay/settings`)
  url.searchParams.set('name', name)
  try {
    const response = await fetch(url, {
      credentials: 'include',
    })
    if (response.status < 300) return await response.json()
    console.log(await response.text())
    throw new Error('SubscribersSettings Not Found')
  } catch {
    throw new Error('SubscribersSettings Not Found')
  }
}

export async function getOverlayLink(): Promise<string> {
  const url = new URL(`${window.location.origin}/api/admin/overlay`)
  const response = await fetch(url, {
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
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
  })
  if (response.status > 200) {
    throw new Error('Erro ao buscar o link do overlay')
  }
  const data = await response.text()
  if (data) return data
  throw new Error('Erro ao buscar o link do overlay')
}
