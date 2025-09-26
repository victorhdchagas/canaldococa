'use client'

import { useRouter } from 'next/navigation'

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Sempre redirecionar para login, mesmo se der erro
      router.push('/login')
      router.refresh() // Limpar cache do Next.js
    }
  }

  return { logout }
}
