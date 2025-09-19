'use client'

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
