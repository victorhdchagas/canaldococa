'use client'

import { UserContext } from '@/contexts/userContext'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export function useLogout() {
  const router = useRouter()
  const { setUser } = useContext(UserContext)

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
    } finally {
      // Sempre redirecionar para login, mesmo se der erro
      router.push('/login')
    }
  }

  return { logout }
}
