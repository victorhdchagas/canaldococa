import { authFetch } from '@/lib/auth-fetch'

interface UserSettings {
  name: string
  username: string
  email: string
  plan: string
}
export async function GetUserSettings(): Promise<UserSettings> {
  const url = new URL(`${window.location.origin}/api/user/settings`)
  const response = await authFetch(url, {
    method: 'get',
    credentials: 'include',
  })
  if (response.status > 200) {
    throw new Error('Erro ao buscar os dados do usuario')
  }
  const data = await response.json()
  if (data) return data
  throw new Error('Erro ao buscar os dados do usuario')
}

class UpdatedResponse<T> {
  errors: string[] = []
  data: T | null = null
  get isError() {
    return this.errors.length > 0
  }

  constructor(data?: T, errors?: string[]) {
    if (data) this.data = data
    if (errors) this.errors = errors
  }
}

export async function updateUserSettings(user: {
  name: string
  username: string
}): Promise<UpdatedResponse<UserSettings | null>> {
  const url = new URL(`${window.location.origin}/api/user/settings`)
  const response = await authFetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user),
  })
  const data = await response.json()
  if (response.status >= 400) {
    if (!data) throw new Error('Erro ao atualizar os dados')
    return new UpdatedResponse(null, data)
  }
  if (data) return new UpdatedResponse(data)
  throw new Error('Erro ao buscar os dados do usuario')
}
