// lib/auth-fetch.ts
'use client'

interface AuthFetchOptions extends RequestInit {
  skipRefresh?: boolean
}

// DIFERENÇA: Este fetch automaticamente tenta renovar tokens em caso de 401
export async function authFetch(
  url: string | URL,
  options: AuthFetchOptions = {},
): Promise<Response> {
  const { skipRefresh, ...fetchOptions } = options

  // Primeira tentativa com cookies automáticos
  let response = await fetch(url, {
    credentials: 'include', // Importante: envia cookies automaticamente
    ...fetchOptions,
  })

  // DIFERENCIAL: Se recebeu 401, tenta auto-refresh antes de falhar
  if (response.status === 401 && !skipRefresh) {
    try {
      const refreshResponse = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (refreshResponse.ok) {
        // Tokens renovados nos cookies, tentar requisição original novamente
        response = await fetch(url, {
          credentials: 'include',
          ...fetchOptions,
        })
      } else {
        // Refresh falhou, cookies já foram limpos pelo servidor
        // Redirecionar para login
        window.location.href = '/login'
        throw new Error('Session expired')
      }
    } catch (refreshError) {
      console.error('Auto-refresh failed:', refreshError)
      // Garantir logout manual em caso de erro
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
      window.location.href = '/login'
      throw refreshError
    }
  }

  return response
}

// Hook para uso mais simples
export function useAuthFetch() {
  return {
    // DIFERENÇA: Estes métodos fazem auto-refresh, fetch normal não faz
    get: (url: string, options?: AuthFetchOptions) =>
      authFetch(url, { ...options, method: 'GET' }),

    post: (url: string, data?: any, options?: AuthFetchOptions) =>
      authFetch(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      }),

    put: (url: string, data?: any, options?: AuthFetchOptions) =>
      authFetch(url, {
        ...options,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      }),

    delete: (url: string, options?: AuthFetchOptions) =>
      authFetch(url, { ...options, method: 'DELETE' }),
  }
}
